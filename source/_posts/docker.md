---
title: 容器核心原理
tags: Docker，虚拟化
date: 2025-10-03 22:39:12
---

# Docker核心原理
Docker容器的本质实际上就是宿主机上的进程。

**进程隔离**：进程隔离是指将不同的进程组分开管理，使它们相互独立，避免共享或影响对方的系统资源。进程隔离在 namespace 中起到核心作用，确保一个命名空间内的进程不会对其他命名空间的进程产生影响。实现进程隔离的目的是为了模拟不同“系统”实例的运行环境，每个命名空间内的进程都可以认为自己在独立的系统中。

如何实现Docker下的资源隔离？为了在分布式的环境下进行通信和定位，容器必然要有独立的IP、端口、路由等，自然就联想到了**网络的隔离**。同时，容器还需要一个**独立的主机名**以便在网络中标识自己。有了网络，自然离不开通信，也就想到了**进程间通信需要隔离**。开发者可能也已经想到了权限的问题，对用户和用户组的隔离就实现了**用户权限的隔离**。最后，运行在容器中的应用需要有进程号（PID），自然也需要与宿主机中的**PID进行隔离**。由此，基本上完成了一个容器所需要做的6项隔离，Linux内核中提供了这6种namespace隔离的系统调用

![namespace](/img/pics/docker/namespace.png)

linux内核实现的namespcace，在同一个namespace下的进程可以感知彼此的变化，而对外界的进程一无所知。这样就可以让容器中的进程产生错觉，仿佛自己置身于一个独立的系统环境中，以达到独立和隔离的目的。**实际上，这就是docker实现的基本原理**

## linux namespace的API
Linux namespace API 提供了几种系统调用接口，用于创建和管理命名空间。主要包括 clone()、unshare()、和 setns() 这三个系统调用，每个调用都用于特定的 namespace 管理操作。

- clone()
clone() 系统调用用于创建新进程，并可以指定进程应被加入到新命名空间或现有命名空间中。通过传递不同的标志，clone() 可以创建独立的命名空间，从而实现资源隔离。

clone()实际上是Linux系统调用fork()的一种更通用的实现方式，它可以通过flags来控制使用多少功能。一共有20多种CLONE_*的flag（标志位）参数用来控制clone进程的方方面面（如是否与父进程共享虚拟内存等.

```C
#include <sched.h>

pid_t clone(int (*fn)(void *), void *stack, int flags, void *arg);
```
其中	

```bash
•fn：指定子进程创建后执行的函数。
•stack：指向子进程栈的指针。
•flags：指定新进程要加入的命名空间类型，可以是以下几个标志之一或多个组合：
    •CLONE_NEWPID：创建新的 PID 命名空间。
    •CLONE_NEWNS：创建新的挂载命名空间。
    •CLONE_NEWNET：创建新的网络命名空间。
    •CLONE_NEWUTS：创建新的 UTS 命名空间。
    •CLONE_NEWIPC：创建新的 IPC 命名空间。
    •CLONE_NEWUSER：创建新的用户命名空间。
•arg：传递给 fn 函数的参数。
```


- unshare()

unshare() 用于将当前进程与某些资源隔离开来，创建新的命名空间并将当前进程加入到新的命名空间中。这样可以在已有的进程中动态创建独立的命名空间，而无需创建新进程。

```C

#include <sched.h>
int unshare(int flags);
```
flags：指定要创建的命名空间类型，与 clone() 中的命名空间标志类似。

- setns()
setns() 系统调用允许一个进程附加到已经存在的命名空间中。通过 setns()，可以实现多进程共享同一个命名空间，或在不同的命名空间之间切换进程的资源视图。

```C
#include <sched.h>

int setns(int fd, int nstype);
```
fd：指向要加入的命名空间的文件描述符（通常是 /proc/[pid]/ns/ 目录下的文件）。  
nstype：指定要加入的命名空间类型，例如 CLONE_NEWNET、CLONE_NEWNS 等。

使用 ```setns()``` 可以让一个进程进入到另一个进程的命名空间，适用于管理工具、监控应用等需要跨命名空间操作的场景。在Docker中，使用```docker exec```命令在已经运行着的容器中执行一个新的命令，就需要用到该方法。通过```setns()```系统调用，进程从原先的namespace加入某个已经存在的namespace，使用方法如下。通常为了不影响进程的调用者，也为了使新加入的pid namespace生效，会在```setns()```函数执行后使用```clone()```创建子进程继续执行命令，让原先的进程结束运行。

- /proc/[pid]/ns文件
从3.8版本的内核开始，用户就可以在/proc/[pid]/ns文件下看到指向不同namespace号的文件，形如[4026531839]者即为namespace号。
![proc](/img/pics/docker/proc.png)

如果两个进程指向的namespace编号相同，就说明它们在同一个namespace下，否则便在不同namespace里
面。```/proc/[pid]/ns```里设置这些link的的另外一个作用是，一旦上述link文件被打开，只要打开的文件描述符（fd）存在，那么就算该namespace下的所有进程都已经结束，这个namespace也会一直存在，后续进程也可以再加入进来。在Docker中，通过文件描述符定位和加入一个存在的namespace是最基本的方式。

### UTS namespace
UTS（UNIX Time-sharing System）namespace提供了主机名和域名的隔离，这样每个Docker容器就可以拥有独立的主机名和域名了，在网络上可以被视作一个独立的节点，而非宿主机上的一个进程。Docker中，每个镜像基本都以自身所提供的服务名称来命名镜像的hostname，且不会对宿主机产生任何影响，其原理就是利用了UTS namespace。

例子：
```C
#define _GNU_SOURCE
#include <sys/types.h>#include <sys/wait.h>
#include <stdio.h>
#include <sched.h>
#include <signal.h>
#include <unistd.h>

#define STACK_SIZE (1024 * 1024)

static char child_stack[STACK_SIZE];char* const child_args[] = {
    "/bin/bash",
    NULL
};

int child_main(void* args) {
    printf("在子进程中!\n");
    execv(child_args[0], child_args);    return 1;
}

int main() {
    printf("程序开始: \n");
    int child_pid = clone(child_main, child_stack +STACK_SIZE, SIGCHLD, NULL);
    waitpid(child_pid, NULL, 0);
    printf("已退出\n");
    return 0;
}
```
编译运行该程序可以看到如下结果：
```bash
root@local:~# gcc -Wall uts.c -o uts.o && ./uts.o 程序开始:
在子进程中!
root@local:~# exit
exit
已退出
root@local:~#
```
接下来修改代码加入uts隔离。运行代码需要root权限，以防止普通用户任意修改系统主机名导致set-user-ID相关的应用运行出错。
```C
//[...]
int child_main(void* arg) {
    printf("在子进程中!\n");
    sethostname("NewNamespace", 12);
    execv(child_args[0], child_args);    return 1;
}

int main() {
//[...]
int child_pid = clone(child_main, child_stack+STACK_SIZE,    CLONE_NEWUTS | SIGCHLD, NULL);
//[...]
}

```
再次运行，可以看到namespace已经发生变化了:
```bash
root@local:~# gcc -Wall namespace.c -o main.o && ./main.o 程序开始:
在子进程中!
root@NewNamespace:~# exit
exit
已退出
root@local:~#  <- 回到原来的hostname
```

### IPC namespace

进程间通信（Inter-Process Communication，IPC）涉及的IPC资源包括常见的信号量、消息队列和共享内存。申请IPC资源就申请了一个全局唯一的32位ID，所以IPC namespace中实际上包含了系统IPC标识符以及实现POSIX消息队列的文件系统。在同一个IPC namespace下的进程彼此可见，不同IPC namespace下的进程则互相不可见。

IPC namespace在实现代码上与UTS namespace相似，只是标识位有所变化，需要加上CLONE_NEWIPC参数。
```C
//[...]
int child_pid = clone(child_main, child_stack+STACK_SIZE,           CLONE_NEWIPC | CLONE_NEWUTS | SIGCHLD, NULL);
//[...]
```
目前使用IPC namespace机制的系统不多，其中比较有名的有PostgreSQL。Docker当前也使用IPC namespace实现了容器与宿主机、容器与容器之间的IPC隔离。

### PID namespace
PID namespace隔离非常实用，它对进程PID重新标号，**即两个不同namespace下的进程可以有相同的PID**。每个PID namespace都有自己的计数程序。内核为所有的PID namespace维护了一个树状结构，最顶层的是系统初始时创建的，被称为root namespace。它创建的新PID namespace被称为child namespace（树的子节点），而原先的PID namespace就是新创建的PID namespace的parentnamespace（树的父节点）。通过这种方式，不同的PIDnamespaces会形成一个层级体系。所属的父节点可以看到子节点中的进程，并可以通过信号等方式对子节点中的进程产生影响。反过来，子节点却不能看到父节点PID namespace中的任何内容。

因此：  
- 每个PID namespace中的第一个进程“PID 1”，都会像传统Linux中的init进程一样拥有特权，起特殊作用。
- 一个namespace中的进程，不可能通过kill或ptrace影响父节点或者兄弟节点中的进程，因为其他节点的PID在这个namespace中没有任何意义。
- 如果你在新的PID namespace中重新挂载/proc文件系统，会发现其下只显示同属一个PID namespace中的其他进程。
- 在root namespace中可以看到所有的进程，并且递归包含所有子节点中的进程。

> 一种在外部监控Docker中运行程序的方法：就是监控Docker daemon所在的PID namespace下的所有进程及其> 子进程，再进行筛选即可。

#### PID namespace中的init进程
在传统的Unix系统中，PID为1的进程是init，地位非常特殊。它作为所有进程的父进程，维护一张进程表，不断检查进程的状态，一旦有某个子进程因为父进程错误成为了“孤儿”进程，init就会负责收养这个子进程并最终回收资源，结束进程。所以在要实现的容器中，启动的第一个进程也需要实现类似init的功能，维护所有后续启动进程的运行状态。

当系统中存在树状嵌套结构的PID namespace时，若某个子进程成为孤儿进程，收养该子进程的责任就交给了该子进程所属的PID namespace中的init进程。PID namespace维护这样一个树状结构，有利于系统的资源监控与回收。因此，如果确实需要在一个Docker容器中运行多个进程，最先启动的命令进程应该是具有资源监控与回收等管理能力的，如bash。

#### 信号与init进程
内核还为PID namespace中的init进程赋予了其他特权——信号屏蔽。如果init中没有编写处理某个信号的代码逻辑，那么与init在同一个PID namespace下的进程（即使有超级权限）发送给它的该信号都会被屏蔽。这个功能的主要作用是防止init进程被误杀。

那么，父节点PID namespace中的进程发送同样的信号给子节点中的init进程，这会被忽略吗？父节点中的进程发送的信号，如果不是SIGKILL（销毁进程）或SIGSTOP（暂停进程）也会被忽略。但如果发送SIGKILL或SIGSTOP，子节点的init会强制执行（无法通过代码捕捉进行特殊处理），也即是说父节点中的进程有权终止子节点中的进程。

**一旦init进程被销毁，同一PID namespace中的其他进程也随之接收到SIGKILL信号而被销毁** 。理论上，该PID namespace也不复存在了。但是如果/proc/[pid]/ns/pid 处于被挂载或者打开状态，namespace就会被保留下来。然而，保留下来的namespace无法通过setns()或者fork()创建进程，所以实际上并没有什么作用。

当一个容器内存在多个进程时，容器内的init进程可以对信号进行捕获，当SIGTERM或SIGINT等信号到来时，对其子进程做信息保存、资源回收等处理工作。在Docker daemon的源码中也可以看到类似的处理方式，当结束信号来临时，结束容器进程并回收相应资源。

创建其他namespace时unshare()和setns()会直接进入新的namespace，而唯独PID namespace例外。因为调用getpid()函数得到的PID是根据调用者所在的PID namespace而决定返回哪个PID，进入新的PID namespace会导致PID产生变化。而对用户态的程序和库函数来说，它们都认为进程的PID是一个常量，PID的变化会引起这些进程崩溃。

换句话说，一旦程序进程创建以后，那么它的PID namespace 的关系就确定下来了，进程不会变更它们对应的PID
namespace。在Docker中，docker exec会使用setns()函数加入已经存在的命名空间，但是最终还是会调用clone()函数，原因就在于此。

### mount namespace
mount namespace通过隔离文件系统挂载点对隔离文件系统提供支持，它是历史上第一个Linux namespace，所以标识位比较特殊，就是CLONE_NEWNS。隔离后，不同mount namespace中的文件结构发生变化也互不影响。可以通过```/proc/[pid]/mounts```查看到所有挂载在当前namespace中的文件系统，还可以通过```/proc/[pid]/mountstats```看到mount namespace中文件设备的统计信息，包括挂载文件的名字、文件系统类型、挂载位置等。

进程在创建mount namespace时，会把当前的文件结构复制给新的namespace。新namespace中的所有mount操作都只影响自身的文件系统，对外界不会产生任何影响。这种做法非常严格地实现了隔离，但对某些情况可能并不适用。

>比如父节点namespace中的进程挂载了一张CD-ROM，这时子节点namespace复制的目录结构是无法自动挂载上这>>张CD-ROM的，因为这种操作会影响到父节点的文件系统。

挂载传播（mount propagation）解决了这个问题，挂载传播定义了挂载对象（mount object）之间的关系，这样的关系包括**共享关系**和**从属关系**，系统用这些关系决定任何挂载对象中的挂载事件如何传播到其他挂载对象。

- **共享关系**: 如果两个挂载对象具有共享关系，那么一个挂载对象中的挂载事件会传播到另一个挂载对象，反之亦然。
- **从属关系**: 如果两个挂载对象形成从属关系，那么一个挂载对象中的挂载事件会传播到另一个挂载对象，但是反之不行；在这种关系中，从属对象是事件的接收者。

传播事件的挂载对象称为**共享挂载**；接收传播事件的挂载对象称为**从属挂载**；同时兼有前述两者特征的挂载对象称为**共享/从属挂载**；既不传播也不接收传播事件的挂载对象称为**私有挂载**；另一种特殊的挂载对象称为**不可绑定的挂载**，它们与私有挂载相似，但是不允许执行绑定挂载，即创建mount namespace时这块文件对象不可被复制。

![mount](/img/pics/docker/mount.png)

### network namespace
当我们了解完各类namespace，兴致勃勃地构建出一个容器，并在容器中启动一个Apache进程时，却出现了“80端口已被占用”的错误，原来主机上已经运行了一个Apache进程，这时就需要借助network namespace技术进行网络隔离。

network namespace主要提供了关于网络资源的隔离，包括网络设备、IPv4和IPv6协议栈、IP路由表、防火墙、```/proc/net```目录、```/sys/class/net```目录、套接字（socket）等。**一个物理的网络设备最多存在于一个network namespace中**，

>可以通过创建veth pair（虚拟网络设备对：有两端，类似管道，如果数据从一端传入另一端也能接收到，反之亦然）在不同的network namespace 间创建通道，以达到通信目的。

一般情况下，物理网络设备都分配在最初的root namespace（表示系统默认的namespace）中。但是如果有多块物理网卡，也可以把其中一块或多块分配给新创建的network namespace。

:warning: 需要注意的是，当新创建的network namespace被释放时（所有内部的进程都终止并且namespace文件没有被挂载或打开），**在这个namespace 中的物理网卡会返回到root namespace，而非创建该进程的父进程所在的network namespace。**

当说到network namespace时，指的未必是真正的网络隔离，而是把网络独立出来，给外部用户一种透明的感觉，仿佛在与一个独立网络实体进行通信。

为了达到该目的，容器的经典做法就是创建一个veth pair（虚拟以太网对），一端放置在新的namespace中，通常命名为eth0，一端放在原先的namespace中连接物理网络设备，再通过把多个设备接入网桥或者进行路由转发，来实现通信的目的。在建立起veth pair之前，新旧namespace该如何通信呢？答案是pipe（管道）。

>以Docker daemon启动容器的过程为例，假设容器内初始化的进程称为init。Docker daemon在宿主机上负责创建这个veth pair，把一端绑定到docker0网桥上，另一端接入新建的network namespace进程中。这个过程执行期间，Docker daemon和init就通过pipe进行通信。具体来说，就是在Docker daemon完成veth pair的创建之前，init在管道的另一端循环等待，直到管道另一端传来Docker daemon关于veth设备的信息，并关闭管道。init才结束等待的过程，并把它的“eth0”启动起来。

![veth pair in docker](/img/pics/docker/veth.png)


### user namespace
user namespace主要隔离了安全相关的标识符（identifier）和属性（attribute），包括用户ID、用户组ID、root目录、key（指密钥）以及特殊权限。通俗地讲，一个普通用户的进程通过clone()创建的新进程在新user namespace中可以拥有不同的用户和用户组。这意味着一个进程在容器外属于一个没有特权的普通用户，但是它创建的容器进程却属于拥有所有权限的超级用户，这个技术为容器提供了极大的自由。

user namespace实际上并不算完全成熟，很多发行版担心安全问题，在编译内核的时候并未开启USER_NS。Docker在1.10 版本中对user namespace进行了支持。只要用户在启动Docker daemon的时候指定了--userns-remap，那么当用户运行容器时，容器内部的root用户并不等于宿主机内的root用户，而是映射到宿主上的普通用户。

- user namespace被创建后，第一个进程被赋予了该namespace 中的全部权限，这样该init进程就可以完成所有必要的初始化工作，而不会因权限不足出现错误。
- 从namespace内部观察到的UID和GID已经与外部不同了，表示尚未与外部namespace用户映射。此时需要对user namespace内部的这个初始user和它外部namespace 的某个用户建立映射，这样可以保证当涉及一些对外部namespace的操作时，系统可以检验其权限（比如发送一个信号量或操作某个文件）。同样用户组也要建立映射。
- 用户在新namespace中有全部权限，但它在创建它的父namespace中不含任何权限，就算调用和创建它的进程有全部权限也是如此。因此哪怕是root用户调用了clone()在user namespace中创建出的新用户，在外部也没有任何权限。
- 最后，user namespace的创建其实是一个层层嵌套的树状结构。最上层的根节点就是root namespace，新创建的每个user namespace都有一个父节点user namespace，以及零个或多个子节点user namespace，这一点与PID namespace非常相似。

![user namespace](/img/pics/docker/user.png)

进行用户绑定，可以通过在```/proc/[pid]/uid_map`` 和```/proc/[pid]/gid_map```两个文件中写入对应的绑定信息就可以实现这一点，格式如下。
```bash
ID-inside-ns   ID-outside-ns   length
```

如果要把user namespace与其他namespace混合使用，那么依旧需要root权限。解决方案是先以普通用户身份创建user namespace，然后在新建的namespace中作为root，在clone()进程加入其他类型的namespace隔离。

Docker不仅使用了user namespace，还使用了在user namespace中涉及的Capabilities机制。Linux把原来和超级用户相关的高级权限划分为不同的单元，称为Capability。这样管理员就可以独立对特定的Capability进行使用或禁止。Docker同时使用user namespace和Capability，这在很大程度上加强了容器的安全性。

## cgroups资源限制
cgroups不仅可以限制被namespace隔离起来的资源，还可以为资源设置权重、计算使用量、操控任务（进程或线程）启停等。

### cgroups介绍
cgroups是Linux内核提供的一种机制，这种机制可以根据需求把一系列系统任务及其子任务整合（或分隔）到按资源划分等级的不同组内，从而为系统资源管理提供一个统一的框架。

cgroups可以限制、记录任务组所使用的物理资源（包括CPU、Memory、IO等），为容器实现虚拟化提供了基本保证，是构建Docker等一系列虚拟化管理工具的基石。

**cgroups具有的特点**：
- cgroups的API以一个伪文件系统的方式实现，用户态的程序可以通过文件操作实现cgroups的组织管理。
- cgroups的组织管理操作单元可以细粒度到线程级别，另外用户可以创建和销毁cgroup，从而实现资源再分配和管理。
- 所有资源管理的功能都以子系统的方式实现，接口统一。
- 子任务创建之初与其父任务处于同一个cgroups的控制组。

### cgroups作用
实现cgroups的主要目的是为不同用户层面的资源管理，提供一个统一化的接口。从单个任务的资源控制到操作系统层面的虚拟化，cgroups提供了以下四大功能9。
- **资源限制**：cgroups可以对任务使用的资源总额进行限制。如设定应用运行时使用内存的上限，一旦超过这个配额就发出OOM（Out of Memory）提示。
- **优先级分配**：通过分配的CPU时间片数量及磁盘IO带宽大小，实际上就相当于控制了任务运行的优先级。
- **资源统计**：cgroups可以统计系统的资源使用量，如CPU使用时长、内存用量等，这个功能非常适用于计费。
- **任务控制**：cgroups可以对任务执行挂起、恢复等操作。

### cgroups术语表
- **task（任务）**：在cgroups的术语中，任务表示系统的一个进程或线程。
- **cgroup（控制组）**：cgroups中的资源控制都以cgroup为单位实现。cgroup表示按某种资源控制标准划分而成的任务组，包含一个或多个子系统。一个任务可以加入某个cgroup，也可以从某个cgroup迁移到另外一个cgroup。
- **subsystem（子系统）**：cgroups中的子系统就是一个资源调度控制器。比如CPU子系统可以控制CPU时间分配，内存子系统可以限制cgroup内存使用量。
- **hierarchy（层级）**：层级由一系列cgroup以一个树状结构排列而成，每个层级通过绑定对应的子系统进行资源控制。层级中的cgroup节点可以包含零或多个子节点，子节点继承父节点挂载的子系统。整个操作系统可以有多个层级。
### 组织结构与基本规则
系统中的多个cgroup构成树状结构，子节点从父节点继承属性。系统中的多个cgroup构成的层级并非单根结构，可以允许存在多个。

如果任务模型是由init作为根节点构成的一棵树，那么系统中的多个cgroup则是由多个层级构成的森林。这样做的目的很好理解，如果只有一个层级，那么所有的任务都将被迫绑定其上的所有子系统，这会给某些任务造成不必要的限制。**在Docker中，每个子系统独自构成一个层级，这样做非常易于管理。**

**规则：**
- 规则1:同一个层级可以附加一个或多个子系统。

- 规则2:一个子系统可以附加到多个层级，当且仅当目标层级只有唯一一个子系统时。

- 规则3:系统每次新建一个层级时，该系统上的所有任务默认加入这个新建层级的初始化cgroup，这个cgroup也被称为root cgroup。对于创建的每个层级，任务只能存在于其中一个cgroup中，即一个任务不能存在于同一个层级的不同cgroup中，但一个任务可以存在于不同层级中的多个cgroup中。

- 规则4:任务在fork/clone自身时创建的子任务默认与原任务在同一个cgroup中，但是子任务允许被移动到不同的cgroup中。即fork/clone完成后，父子任务间在cgroup方面是互不影响的。

### 子系统
子系统实际上就是cgroups的资源控制系统，每种子系统独立地控制一种资源，目前Docker使用如下9种子系统：
**blkio**：可以为块设备设定输入/输出限制，比如物理驱动设备（包括磁盘、固态硬盘、USB等）。
**cpu**：使用调度程序控制任务对CPU的使用。
**cpuacct**：自动生成cgroup中任务对CPU资源使用情况的报告。
**cpuset**：可以为cgroup中的任务分配独立的CPU（此处针对多处理器系统）和内存。
**devices**：可以开启或关闭cgroup中任务对设备的访问。
**freezer**：可以挂起或恢复cgroup中的任务。
**memory**：可以设定cgroup中任务对内存使用量的限定，并且自动生成这些任务对内存资源使用情况的报告。
**perf_event**：使用后使cgroup中的任务可以进行统一的性能测试。
**net_cls**：Docker没有直接使用它，它通过使用等级识别符（classid）标记网络数据包，从而允许Linux流量控制程序（Traffic Controller，TC）识别从具体cgroup中生成的数据包。

在Docker的实现中，Docker daemon会在单独挂载了每一个子系统的控制组目录（比如```/sys/fs/ cgroup/cpu```）下创建一个名为docker的控制组，然后在docker控制组里面，再为每个容器创建一个以容器ID为名称的容器控制组，这个容器里的所有进程的进程号都会写到该控制组tasks中，并且在控制文件（比如cpu.cfs_quota_us）中写入预设的限制参数值。

### cgroups实现方式和工作原理
cgroups的实现本质上是给任务挂上钩子，当任务运行的过程中涉及某种资源时，就会触发钩子上所附带的子系统进行检测，根据资源类别的不同，使用对应的技术进行资源限制和优先级分配。

## Docker架构概览
Docker使用了传统的```client-server```架构模式。用户通过Docker client与Docker daemon建立通信，并将请求发送给后者。而Docker的后端是松耦合结构，不同模块各司其职，有机组合，完成用户的请求。  
![Docker架构](/img/pics/docker/docker_arc.png)

Docker daemon是Docker架构中的主要用户接口。首先，它提供了API Server用于接收来自Docker client的请求，其后根据不同的请求分发给Docker daemon的不同模块执行相应的工作，其中对容器运行时、volume、镜像以及网络方面的具体实现已经放在daemon以外的模块或项目中。
### Docker daemon
Docker daemon是Docker最核心的后台进程，它负责响应来自Docker client的请求，然后将这些请求翻译成系统调用完成容器管理操作。该进程会在后台启动一个API Server，负责接收由Docker client发送的请求；接收到的请求将通过Docker daemon分发调度，再由具体的函数来执行请求。

**Docker client**是一个泛称，用来向Docker daemon发起请求，执行相应的容器管理操作。它既可以是命令行工具docker，也可以是任何遵循了Docker API的客户端。

### 镜像管理
Docker通过distribution、registry、layer、image、reference等模块实现
了Docker镜像的管理，这些模块统称为镜像管理（imagemanagement）。

- distribution负责与Docker registry交互，上传下载镜像以及存储与v2 registry有关的元数据。
- registry模块负责与Docker registry有关的身份验证、镜像查找、镜像验证以及管理registry mirror等交互操作。
- image模块负责与镜像元数据有关的存储、查找，镜像层的索引、查找以及镜像tar包有关的导入、导出等操作。
- reference负责存储本地所有镜像的repository和tag名，并维护与镜像ID之间的映射关系。
- layer模块负责与镜像层和容器层元数据有关的增删查改，并负责将镜像层的增删查改操作映射到实际存储镜像层文件系统的graphdriver模块。

Docker daemon负责将用户请求转译成系统调用，进而创建和管理容器。而在具体实现过程中，为了将这些系统调用抽象成为统一的操作接口方便调用者使用，Docker把这些操作分成了容器执行驱动、volume存储驱动、镜像存储驱动3种，分别对应**execdriver**、**volumedriver**和**graphdriver**。

### client与daemon
 **client模式**：  
docker命令对应的源文件是```docker/docker.go```（如果不做说明，根路径是项目的根目录
docker/），它的使用方式如下： 

```bash
docker [OPTIONS] COMMAND [arg...]
```
其中OPTIONS参数称为flag，任何时候执行一个docker命令，Docker都需要先解析这些flag，然后按照用户声明的COMMAND向指定的子命令执行对应的操作。如果子命令为daemon，Docker就会创建一个运行在宿主机的daemon
进程（```docker/daemon.go#mainDaemon```），即执行daemon模式。其余子命令都会执行client模式。处于client模式下的docker命令工作流程包含如下几个步骤。

- **解析flag信息**
- **创建client实例**
- **执行具体命令**
- **执行对应的方法，发起请求**

**daemon模式**：
一旦docker进入了daemon模式，剩下的初始化和启动工作就都由Docker的```docker/daemon.go#CmdDaemon```来完成。Docker daemon通过一个server模块（```api/server/server.go```）接收来自client的请求，然后根据请求类型，交由具体的方法去执行。因此daemon首先需要启动并初始化这个server。另一方面，启动server后，Docker进程需要初始化一个daemon对象（daemon/daemon.go）来负责处理server接收到的请求。  

下面是Docker daemon启动与初始化过程的详细解析。
- **API Server的配置和初始化过程**
- **Daemon对象的创建与初始化过程**



