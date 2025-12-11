---
title: 强化学习——动态规划
date: 2025-12-10 15:41:51
index_img: /img/index_img/DP.png
tags: 强化学习,动态规划
categories: 强化学习
sticky: 97
---
# 动态规划算法

动态规划（dynamic programming）是程序设计算法中非常重要的内容，它的基本思想是**将待求解问题分解成若干个子问题，先求解子问题，然后从这些子问题的解得到目标问题的解**。

<!-- more -->

通常许多子问题非常相似，为此动态规划法试图仅仅解决每个子问题一次，从而减少计算量：一旦某个给定子问题的解已经算出，则将其记忆化存储，以便下次需要同一个子问题解之时直接查表。这种做法在重复子问题的数目关于输入的规模呈指数增长时特别有用。

动态规划算法能够工作有一个极其重要的前提：**完全已知的环境（Model-Based）**，这意味着智能体（Agent）必须知道：

- 所有的状态（States）。
- 所有的动作（Actions）。
- 状态转移概率：如果在状态 A 做动作 B，有百分之多少的概率通过跳到状态 C？
- 奖励函数：每一步会得到多少具体的分数？

因为所有的规则都已知，DP 不需要去真实环境中冒险，它只需要在脑子里（计算机内存中）进行推演计算。

## 策略评估
策略评估的任务是针对一个给定的策略$\pi$，计算出该策略的状态价值函数$V^{\pi}(s)$。为了计算这个策略的状态价值函数，我们可以使用动态规划算法。首先我们回忆一下马尔可夫决策过程中提到的贝尔曼期望方程：

$$
\begin{align*}
V^{\pi}(s) = \sum_{a \in \mathcal{A}} \pi(a|s)Q^{\pi}(s,a)
\end{align*}
$$

其中，$V^{\pi}(s)$是状态$s$的价值，$\pi$是策略，$Q^{\pi}(s,a)$是状态$s$下动作$a$的价值。使用策略时，状态下采取动作的价值等于即时奖励加上经过衰减后的所有可能的下一个状态的状态转移概率与相应的价值的乘积：

$$
\begin{align*}
Q^{\pi}(s,a) = r(s,a) + \gamma \sum_{s' \in \mathcal{S}} P(s'|s,a) V^{\pi}(s')
\end{align*}
$$
那么，价值函数就可以写为：

$$
\begin{align*}
V^{\pi}(s) = \sum_{a \in \mathcal{A}} \pi(a|s) \left( r(s,a) + \gamma \sum_{s' \in \mathcal{S}} P(s'|s,a) V^{\pi}(s') \right)
\end{align*}
$$
根据这个式子，**当知道奖励函数和状态转移函数时，我们可以根据下一个状态的价值来计算当前状态的价值**。因此，根据动态规划的思想，可以把计算下一个可能状态的价值当成一个子问题，把计算当前状态的价值看作当前问题。在得知子问题的解后，就可以求解当前问题。更一般的，考虑所有的状态，就变成了用上一轮的状态价值函数来计算当前这一轮的状态价值函数，即:

$$
\begin{align*}
V_{k+1}(s) = \sum_{a \in \mathcal{A}} \pi(a|s) \left( r(s,a) + \gamma \sum_{s' \in \mathcal{S}} P(s'|s,a) V_{k}(s') \right)
\end{align*}
$$

其中，$V_{k}(s)$是第$k$轮的状态价值函数，$V_{k+1}(s)$是第$k+1$轮的状态价值函数。这个式子就是策略评估的贝尔曼期望方程。我们可以以任意初始值$V_0(s)$开始，反复使用这个贝尔曼期望方程更新价值函数，直到价值函数收敛到$V^{\pi}(s)$。这就是**策略评估**的过程。

简单来说，无论初始值 $V^0$ 设置得多么离谱（全是0，或者全是随机乱数），策略评估之所以一定能收敛到真实的 $V^\pi$，是因为背后的数学机制保证了每一次迭代，估计值和真实值之间的“距离”都会被迫缩小。这个数学机制被称为 **压缩映射（Contraction Mapping）**，它基于 **巴拿赫不动点定理（Banach Fixed Point Theorem）**。

{% fold info @原理解释 %}
折扣因子 $\gamma$ 通常是一个介于 $0$ 到 $1$ 之间的数（例如 0.9）。它的存在不仅仅是为了表达“未来的奖励不如现在值钱”，在数学计算上，它起到了**“压缩”**的作用。具体来说，$V_{true}$ 是我们要找的目标（真实的 $V^\pi$），而 $V_{k}$ 是我们当前的猜测。它们之间有一个误差（Error），即距离 $D = ||V_{k} - V_{true}||_{\infty}$（最大范数距离）。当我们进行一次迭代更新（即用 $V^k$ 算出 $V^{k+1}$）时，数学上可以证明：$error_{new} \le \gamma \times error_{old}$

只要 $\gamma < 1$，随着迭代次数 $k \to \infty$，这个误差项 $\gamma^k$ 必定趋向于 0。根据巴拿赫不动点定理 (Banach Fixed Point Theorem) ， $V^\pi$ 是更新公式的一个 “不动点 (fixed point)”。

>不动点的定义：**如果一个函数（或算子）$T$，使得 $x = T(x)$，那么 $x$ 就是不动点。当 $V$ 收敛到 $V^\pi$ 时，再代入公式计算，结果还是 $V^\pi$，所以它是不动点。**

定理的保证：在一个完备的空间里，只要一个算子是“压缩映射”（即它能让任意两点间的距离变小），那么这个算子一定存在一个不动点。这个不动点是唯一的（不会收敛到别的地方去）。无论从哪里开始迭代（任意初始值 $V^0$），最终都一定会收敛到这个不动点。

总之，由于贝尔曼期望方程定义了一个压缩映射算子，折扣因子 $\gamma < 1$ 强制每次迭代都消除掉一部分误差，不动点定理从数学上锁死了最终的结局——只能是那个唯一的真实价值 $V^\pi$。所以，实际上，可以证明当 $k \to \infty$ 时，序列 $\{V^k\}$ 会收敛到 $V^\pi$。
{% endfold %}

因此，我们可以选定任意初始值$V^0$。根据贝尔曼期望方程，可以得知是以上更新公式的一个不动点（fixed point）。事实上，可以证明当$k\rightarrow\infty $时，序列$\{V^k\}$会收敛到$V^\pi$，所以可以据此来计算得到一个策略的状态价值函数。可以看到，由于需要不断做贝尔曼期望方程迭代，策略评估其实会耗费很大的计算代价。在实际的实现过程中，如果某一轮$max_{s \in \mathcal{S}} |V^{k+1}(s) - V^k(s)|$的值非常小，可以提前结束策略评估。这样做可以提升效率，并且得到的价值也非常接近真实的价值。  

## 策略提升
由上述内容可知，使用策略评估计算得到当前策略的状态价值函数之后，我们可以据此来改进该策略。如果我们已经知道在某策略 $\pi$ 下每个状态的“真实价值” $V^{\pi}(s)$，那么我们当然可以选择更优的动作去提高长期回报。换句话说：**策略提升就是：在每个状态选择“当前看来最好的动作”。**

策略提升的核心思想是贪心选择 (Greedy Action)，本质是单步前瞻（One-step lookahead）。假设你站在状态 $s$，原来的策略告诉你该往左走。但是你手里有了“地图价值表”（$V^\pi$），通过计算发现：如果往左走（老策略），期望回报是 10 分。如果往右走（新尝试），这一步的即时奖励加上跳到的下一个状态的价值，期望回报是 12 分。策略提升的逻辑就是： 既然往右走期望更高，那我以后在这个状态 $s$ 就永久改成往右走！

具体数学公式我们要计算在状态 $s$ 下，做动作 $a$ 的动作价值（也就是 $Q$ 值，但这里我们用 $V$ 来推导）：

$$
\begin{align*}
Q^\pi(s, a) = R(s, a) + \gamma \sum_{s'} P(s'|s, a) V^\pi(s')
\end{align*}
$$

其中，$R(s, a)$：这一步立马拿到的奖励。$\gamma \sum P(...) V^\pi(s')$：跳到下一个状态 $s'$ 后，旧策略 $\pi$ 在未来的价值期望。新策略 $\pi'(s)$ 的定义为：$$\pi'(s) = \underset{a}{\text{argmax}} \ Q^\pi(s, a)$$也就是说，新策略在状态 $s$ 只有一种选择：选那个能让 $Q^\pi(s, a)$ 最大的动作 $a$。这个根据贪心法选取动作从而得到新的策略的过程称为策略提升。当策略提升之后得到的策略$\pi'$和之前的策略$\pi$一样时，说明策略迭代达到了收敛，此时$\pi'$就是最优策略。

现在假设存在一个确定性策略$\pi'$,策略提升定理的证明通过以下推导过程可以证明，使用上述提升公式得到的新策略在每个状态的价值不低于原策略在该状态的价值。

$$
\begin{align*}
V^\pi(s)&\leq Q^\pi(s,\pi'(s))\\
&=\mathbb{E}_{\pi'}[R_{t} + \gamma V^\pi(S_{t+1})|S_t=s]\\
&\leq\mathbb{E}_{\pi'}[R_{t} + \gamma Q^\pi(S_{t+1},\pi'({S_{t+1}}))|S_t=s]\\
&=\mathbb{E}_{\pi'}[R_{t} + \gamma R_{t+1} + \gamma^2 V^\pi(S_{t+2})|S_t=s]\\
&\vdots\\
&\leq \mathbb{E}_{\pi'}[R_{t} + \gamma R_{t+1} + \gamma^2 R_{t+2} + \cdots |S_t=s]\\
&=V^{\pi'}(s)
\end{align*}
$$

因此，使用策略提升公式得到的新策略在每个状态的价值不低于原策略在该状态的价值。

### 流程
策略提升的完整流程结合策略评估，策略提升通常发生在这样一个循环中（这被称为策略迭代 Policy Iteration）：
- 输入：
  - 当前环境模型（状态转移概率 $P$，奖励 $R$）。
  - 刚刚评估好的状态价值函数 $V^\pi$。
  - 当前策略 $\pi$。
- 遍历所有状态（对于每一个 $s \in S$）：
  - 计算候选值：对于该状态下所有可能的动作 $a$，计算 $Q(s, a) = R + \gamma \sum P V$。
  - 比较：看看哪个动作 $a$ 得到的 $Q$ 值最大。
  - 更新策略：把策略 $\pi(s)$ 更新为这个产生最大值的动作。
- 判定：如果在所有状态下，新选出的动作和老策略的动作一模一样（即策略稳定了，不再变了）。
  - 结束：此时的策略就是最优策略 $\pi^*$。
  - 否则：把这个新策略 $\pi'$ 当作“当前策略”，拿回去重新做“策略评估”，如此往复。

  {% img /img/pics/DP/mc8.png  "策略迭代" %}

## 价值迭代算法
策略迭代中的策略评估需要进行很多轮才能收敛得到某一策略的状态函数，这需要很大的计算量，尤其是在状态和动作空间比较大的情况下。在策略评估（Policy Evaluation）步骤中，需要 对所有状态反复迭代 到收敛，才能得到 $V^\pi$。

这个步骤非常昂贵，尤其当：
- 状态空间大（典型 MDP 的状态数可能上万、百万）
- 策略评估每次都要遍历所有状态

为了理解这一点，我们回顾一下**策略迭代（PI）**的流程，它像是一个“双层循环”：
- 外层循环：策略提升（改变动作）。
- 内层循环：策略评估（为了算准当前策略的分数，需要不断迭代直到收敛）。
{%note info%}
在策略迭代中，每次更新了策略后，我们都要进行无数次迭代，直到把 $V^\pi$ 算得极其精确（收敛到小数点后很多位），才肯进行下一次策略提升。但在实际操作中，我们发现这是浪费的：假设在某个状态，动作 A 的价值是 100，动作 B 的价值是 10。其实你只需要算出 A 大概是 90，B 大概是 20，你就已经知道“选 A 更好”了。你根本不需要等到 A 算出 100.0001、B 算出 10.0001 时才做决定。因此策略评估中的过度精确计算，对于“选择最优动作”这一目的来说，往往是非必须且浪费算力的。
{%endnote%}
价值迭代算法提出了一种简化的策略评估方法，它假设在策略评估步骤中，状态价值函数在每次迭代中只更新一次，然后直接根据更新后的价值进行策略提升。具体来说，价值迭代算法在策略评估步骤中，只进行一轮价值更新，然后直接根据更新后的价值进行策略提升。这样就可以大大减少计算量，尤其是在状态和动作空间比较大的情况下。

在策略评估阶段，只算一步（或者几步），就立刻进行策略提升（取最大值）。这就相当于把策略迭代的两个步骤“揉”成了一步：

A. 数学上的改变

- 策略评估（PI）用的是： 贝尔曼期望方程（Bellman Expectation Equation）。它计算的是“在当前策略下”的平均值。
$$
\begin{align*}
V(s) \leftarrow \sum_a \pi(a|s) (R + \gamma \sum V(s')
\end{align*}
$$
- 价值迭代（VI）用的是： 贝尔曼最优方程（Bellman Optimality Equation）。它直接计算“最优动作”带来的价值。
$$
\begin{align*}
V(s) \leftarrow \max_a (R + \gamma \sum V(s')
\end{align*}
$$

B. 流程上的改变

- 价值迭代不再维护一个显式的“策略 $\pi$”，它只维护价值函数 $V$。扫描每一个状态 $s$。不看当前策略，直接看所有可能的动作 $a$。直接挑选那个让 $Q(s,a)$ 最大的动作，用它的值来更新 $V(s)$。这相当于：刚做了一次评估，马上就做了一次贪心提升。

将其中的贝尔曼最优方程写成迭代更新的形式：
$$
\begin{align*}
V^{k+1}(s)  = \max_{a \in \mathcal{A}} \{r(s,a) + \gamma \sum P(s'|s,a) V^{k}(s')\}
\end{align*}
$$
价值迭代便是按照以上更新方式进行的。等到$V^{k+1}$和$V^{k}$相同时，它就是贝尔曼最优方程的不动点，此时对应着最优状态价值函数$V^*$。然后我们利用$\pi(s) = arg\max_{a \in \mathcal{A}} \{r(s,a) + \gamma \sum P(s'|s,a) V^{k+1}(s')\}$，从中恢复出最优策略即可。

{% codeblock 价值迭代算法 [lang:python] [url] %}
import numpy as np

# --- 1. 价值迭代算法 (复用之前的逻辑) ---
def run_value_iteration(n_states, n_actions, R, P, gamma, threshold=0.1):
    V = np.zeros(n_states)
    i = 0
    while True:
        V_new = np.zeros(n_states)
        for s in range(n_states):
            q_values = []
            for a in range(n_actions):
                # 计算 Q 值
                val = R[s, a] + gamma * np.sum(P[s, a] * V)
                q_values.append(val)
            # 贪心更新 V
            V_new[s] = max(q_values)
        
        # 检查收敛
        if np.max(np.abs(V - V_new)) < threshold:
            break
        V = V_new
        i += 1
    print(f"✅ 价值迭代在第 {i} 轮收敛。")
    return V

def extract_policy(n_states, n_actions, R, P, gamma, V):
    """
    根据最优价值函数 V，恢复最优策略 pi
    """
    optimal_policy = np.zeros(n_states, dtype=int) # 用于存每个状态的最佳动作索引

    print("\n=== 正在提取最优策略 (Policy Extraction) ===")

    for s in range(n_states):
        q_values = []
        
        # 对于状态 s，重新计算所有动作的 Q 值
        for a in range(n_actions):
            # Q(s,a) = R + gamma * sum(P * V)
            expected_future_val = np.sum(P[s, a] * V)
            q_val = R[s, a] + gamma * expected_future_val
            q_values.append(q_val)
        
        # 【关键步骤】Argmax
        # 既然我们已经有了准确的 V，我们只需要选 Q 值最大的那个动作即可
        best_action = np.argmax(q_values)
        optimal_policy[s] = best_action
        
        print(f"状态 {s} 的 Q值分布: {np.round(q_values, 2)} -> 最优动作: {best_action}")

    return optimal_policy

# --- 2. 主程序 ---
if __name__ == "__main__":
    # --- 环境设置 ---
    n_states = 3
    n_actions = 2
    gamma = 0.9
    np.random.seed(42) # 固定随机数

    # 随机生成 R 和 P
    R = np.random.uniform(-1, 10, (n_states, n_actions))
    P = np.random.rand(n_states, n_actions, n_states)

    # 打印出 R 和 P
    print("=== 环境设置 ===")
    print("状态数:", n_states)
    print("动作数:", n_actions)
    print("折扣因子 γ:", gamma)
    print("奖励矩阵 R:\n", np.round(R, 2))
    print("转移概率矩阵 P:\n", np.round(P, 2))

    for s in range(n_states):
        for a in range(n_actions):
            P[s, a] /= np.sum(P[s, a])

    print("=== 步骤1: 计算最优价值函数 V* ===")
    # 得到收敛后的 V
    optimal_V = run_value_iteration(n_states, n_actions, R, P, gamma)
    print(f"最终价值 V*: {np.round(optimal_V, 2)}")

    print("\n=== 步骤2: 恢复最优策略 pi* ===")
    # 调用提取函数
    final_policy = extract_policy(n_states, n_actions, R, P, gamma, optimal_V)
    
    print("-" * 30)
    print("🏆 最终最优策略表:")
    action_names = ["动作A", "动作B"]
    for s, a in enumerate(final_policy):
        print(f"  在 [状态 {s}] -> 请执行 [{action_names[a]}]")
{% endcodeblock %}

输出结果
{%codeblock 输出结果 [lang:text]%}
=== 环境设置 ===
状态数: 3
动作数: 2
折扣因子 γ: 0.9
奖励矩阵 R:
 [[3.12 9.46]
 [7.05 5.59]
 [0.72 0.72]]
转移概率矩阵 P:
 [[[0.06 0.87 0.6 ]
  [0.71 0.02 0.97]]

 [[0.83 0.21 0.18]
  [0.18 0.3  0.52]]

 [[0.43 0.29 0.61]
  [0.14 0.29 0.37]]]
=== 步骤1: 计算最优价值函数 V* ===
✅ 价值迭代在第 38 轮收敛。
最终价值 V*: [53.85 54.48 46.09]

=== 步骤2: 恢复最优策略 pi* ===

=== 正在提取最优策略 (Policy Extraction) ===
状态 0 的 Q值分布: [49.16 53.94] -> 最优动作: 1
状态 1 的 Q值分布: [54.58 50.6 ] -> 最优动作: 0
状态 2 的 Q值分布: [46.1  46.18] -> 最优动作: 1
------------------------------
🏆 最终最优策略表:
  在 [状态 0] -> 请执行 [动作B]
  在 [状态 1] -> 请执行 [动作A]
  在 [状态 2] -> 请执行 [动作B]
{%endcodeblock%}