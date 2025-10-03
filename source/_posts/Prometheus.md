---
title: Prometheus介绍
tags: Prometheus,时序数据
sticky: 94
date: 2025-10-03 22:39:12
---

# Prometheus介绍
## 介绍
PrometheusPrometheus 是一个系统监控和警报系统。简单来说，就是一个存储时间序列数据的数据库，Prometheus 将所有metric data存储为时间序列，即将系统的度量信息与记录的时间戳一起存储。

    Metric data（度量数据）是指用于量化和监测系统、应用程序或服务的性能和健康状态的数据。这类数据通常是通过定期收集和记录的指标，旨在帮助开发者和运维人员了解系统的运行状况、识别潜在问题并进行性能优化。

Prometheus是继Kubernetes之后的第二款加入CNCF的开源软件。

## 基本架构
prometheus的基础组件为：
- Prometheus Server,用于抓取和存储metrics data
- Targets to be scraped，例如能展示其指标的应用程序，或者能导出其他应用程序指标的程序。
- Alertmanager,用于通过预先设置的规则产生告警（一旦metric data出现不符合预期的数据）
![Architecture](/img/pics//Prometheus/architecture.png)

例子，假设有一个web服务器作为目标对象，我们想要提取其中的一个指标，比如说web服务器处理的API调用数量。那么通过在Prometheus在web服务器上加入一些instrumentation code（监控代码）来定义和记录指标，并使之公开指标信息。

Web 服务器会将这些指标信息暴露为一个 HTTP 端点（通常是 /metrics），供 Prometheus 访问。接下来我们就可以通过配置 Prometheus，在 Prometheus 的配置文件中，设置要抓取的 Web 服务器的 IP 地址和端口，并指定抓取的时间间隔（例如每分钟）。抓取指标：Prometheus 会按照配置的时间间隔定期请求 Web 服务器的指标端点，从而获取和存储这些指标数据。以此类推，我们可以创建并抓取多个指标来了解应用程序的运行状态，并根据其创建多个图表。

## metircs 数据类型
Prometheus共支持四种类型的metrics，分别是Counter,Gauge,Histogram,Summary.  
- Counter  
Counter是一种指标值，其只增不减除非被重置。Counter只能用在例如请求次数，错误次数之类的指标。  
- Gauge
Gauge是一种可增可减的数，因此可以被用在例如节点数量、队列中事件数目等的指标。
- Histogram  
Histogram 是一种用于收集和分析度量数据的更为复杂的指标类型。它通过将测量值（如请求处理时间）分配到预定义的**桶（buckets）**中，从而提供了对数据分布的更深入分析。
- Summary
Summaries也可以用来测量事件，并可以作为Histogram的替代品。Summaries更加轻量，但同时也会损失更多的数据。Summary是在应用层的级别上计算的，意味着它不会同时去维护多个微服务实例，只能提供单一实例的局部信息。
## 可视化指标
Grafana是一款开源的数据可视化和监控工具，广泛用于监控和分析系统和应用程序的性能。通过Grafana，用户可以创建、浏览和共享数据的可视化仪表板，这些仪表板可以实时显示数据，并帮助用户识别和解决问题。我们可以将prometheus接入到grafana中来将获得的metric data进行可视化。

在 Grafana 中，http://localhost:9090 通常指的是 Prometheus 的默认 HTTP API 接口。通过grafana接入到这个接口，grafana就可以查看prometheus存储的数据。grafana提供了dashboard来自定义我们对数据的可视化方式，例如折线图、扇形图和热图等。

## 告警（alert）
利用prometheus采集存储到的指标，我们可以定义规则来产生告警。例如说，当一些指标高过某个阈值时，prometheus就会通过Alertmanager产生告警。Alertmanager支持一系列的接收器（例如email,webhook,pagerduty,slack等），当产生告警时，它就会发送到对应的接收器上。

# Prometheus教程
我们可以从两个角度来学习Prometheus，一个是搭建和配置Promethus，另一个就是将其当作一个metricstore来使用。这里主要关注对其的使用，主要对这个数据库的查询。

## Data Model
如上所述，prometheus主要是存储时间序列数据，即属于同一指标和同一组标注维度的时间戳数据。除了这些时间序列外，prometheus可能还会因为查询生成临时的时间序列（例如某几个时间序列的聚合）
## Metric
这里继续详细介绍一下prometheus中的metric.每个时间序列都是被唯一的metric name(指标名称)和一些可选的键值对（称之为labels）所标识。

**Metric names**:

- 指定要测量的系统的一般特征（例如，http_requests_total - 收到的 HTTP 请求总数）。
- 度量名称可包含 ASCII 字母、数字、下划线和冒号。它必须匹配 ```regex [a-zA-Z_:][a-zA-Z0-9_:]*```。

注意：冒号是为用户定义的记录规则保留的。

**Metric labels**：

- 使 Prometheus 的维度数据模型能够识别同一度量名称的任何给定标签组合。它可识别该度量的特定维度实例（例如：使用 POST 方法向 /api/tracks 处理程序发送的所有 HTTP 请求）。查询语言允许根据这些维度进行过滤和聚合。
- 更改任何标签的值，包括添加或删除标签，都将创建一个新的时间序列。
- 标签可包含 ASCII 字母、数字和下划线。它们必须与``` regex [a-zA-Z_][a-zA-Z0-9_]*``` 匹配。
- 以 __（两个“_”）开头的标签名称保留供内部使用。
- 标签值可包含任何 Unicode 字符。
- 标签值为空的标签等同于不存在的标签。

在prometheus中，**Samples**就是指从真实时间序列中采样到的样本数据，每个样本都包括一个64位浮点数据和一个毫秒级精度的时间戳。

例子：
```
<metric name>{<label name>=<label value>, ...}
```
就是指定来一个唯一的时间序列，例如, metric name 为api_http_requests_total 并且 labels 为method="POST" and handler="/messages" 的时间序列数据可能是这样：
```
api_http_requests_total{method="POST", handler="/messages"}
```
## jobs and instances
在prometheus的术语中，一个可以抓取指标数据的端点称之为一个instance，通常对应于一个单独独进程。而一系列相同目的instance的集合（为提高可扩展性或可靠性而复制的进程）就称为一个job.

例子：
```
job: api-server
    instance 1: 1.2.3.4:5670
    instance 2: 1.2.3.4:5671
    instance 3: 5.6.7.8:5670
    instance 4: 5.6.7.8:5671
```
prometheus可以自动地定义时间序列的labels来指示所抓取的对象。

# PromQL语法
PromQL是prometheus提供的一种功能查询语言，能够帮助用户实时选择和聚合时间序列数据。PromQL查询到的结果可以被一个外部系统通过HTTP API进行调用。

## 基本原理
PromQL中，一个表达式/子表达式计算得到的四种结果类型：

- Instant vetccor: 是 一组时间序列，每个时间序列包含一个样本，所有时间序列共享相同的时间戳
- Range vector:  一组时间序列，其中包含每个时间序列随时间变化的一系列数据点
- Scalar: 一个简单的浮点值
- String: 一个简单的字符串值；一般不使用

根据使用的情况，只有一些类型作为用户指定的表达式结果的时候才是合法的。（唯一能够绘制图表的类型就是Instant vector）。
## Literals
### String literals
字符串由单引号，双引号或者反引号指定。PromQL 遵循与 Go 相同的转义规则。对于单引号或双引号中的字符串文字，反斜杠开始转义序列，后面可能跟着 a、b、f、n、r、t、v 或 \。可以使用八进制 (\nnn) 或十六进制（\xnn、\unnnn 和 \Unnnnnnnn）表示法提供特定字符。

相反，反引号指定的字符串文字中的转义字符不会被解析。

```
"this is a string"
'these are unescaped: \n \\ \t'
`these are not unescaped: \n ' " \t`
```

### Float literals
浮点数标量值可以按以下格式写入文字整数或浮点数（仅包含空格是为了提高可读性）：
```
[-+]?(
      [0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?
    | 0[xX][0-9a-fA-F]+
    | [nN][aA][nN]
    | [iI][nN][fF]
)
```
## Time series selectors
时间序列selector负责选择时间序列以及原始或推断的样本时间戳和值。

### Instant vector selectors
Instant vector selectors允许在给定时间戳（时间点）选择一组时间序列和每个时间序列的单个样本值。在最简单的形式中，仅指定指标名称，这会生成一个即时向量，其中包含具有该指标名称的所有时间序列的元素。

例如一个具有 http_requests_total 指标名称的所有时间序列：
```
http_requests_total
```
可以通过在大括号 (```{}```) 中附加以逗号分隔的标签匹配器列表来进一步过滤这些时间序列。

例如具有 ````http_requests_total``` 指标名称且```job```标签设置为 prometheus， 且```group```标签设置为 canary 的时间序列：
```
http_requests_total{job="prometheus",group="canary"}
```
还可以对标签值进行负匹配，或者将标签值与正则表达式进行匹配。存在以下标签匹配运算符：

- =：选择与提供的字符串完全相同的标签。
- !=：选择不等于提供的字符串的标签。
- =~：选择与提供的字符串正则表达式匹配的标签。
- !~：选择与提供的字符串正则表达式不匹配的标签。

**正则表达式匹配是完全锚定的。 env=~"foo" 的匹配被视为 env=~"^foo$"。**

例如，选择用于暂存、测试和开发环境的所有 http_requests_total 时间序列以及除 GET 之外的 HTTP 方法。
```
http_requests_total{environment=~"staging|testing|development",method!="GET"}
```
匹配空标签值的标签匹配器还会选择根本没有特定标签集的所有时间序列。

例如：
```
http_requests_total
http_requests_total{replica="rep-a"}
http_requests_total{replica="rep-b"}
http_requests_total{环境=“开发”}
```
查询``` http_requests_total{environment=""} ```将匹配并返回：
```
http_requests_total
http_requests_total{replica="rep-a"}
http_requests_total{replica="rep-b"}
```
并排除：
```
http_requests_total{environment=“development”}
```
同一标签名可​​以使用多个匹配器。(**都必须通过才能返回结果。**)

查询：
```
http_requests_total{replica!="rep-a",replica=~"rep.*"}
```
然后会匹配：
```
http_requests_total{replica="rep-b"}
```
vector selector 必须指定一个名称或至少一个与空字符串不匹配的标签匹配器。以下表达式是非法的：
```
{job=~".*"} 
```
标签匹配器还可以通过匹配内部 \_\_name\_\_ 标签来应用于指标名称。例如，表达式 ```http_requests_total ```相当于 ```{__name__="http_requests_total"}```。也可以使用 = (!=, =~, !~) 以外的匹配器。以下表达式选择名称以 job: 开头的所有指标：
```
{__name__=~"work:.*"}
```
指标名称不能是关键字 bool、on、ignoring、group_left 和 group_right 之一。以下表达式是非法的：
```
on{} 
```
### Range Vector selectors
Range vector literal的工作方式与Instant vector literal类似，只不过它们选择从当前时刻返回的一系列样本。

从语法上讲，持续时间附加在vector selectors末尾的方括号 ([]) 中，以指定应为每个结果范围。该范围是一个闭区间。

例如择过去 5 分钟内为指标名称为 http_requests_total 且job标签设置为 prometheus 的所有时间序列记录的所有值：
```
http_requests_total{job="prometheus"}[5m]
```

### time durations
Time durations 指定为数字，并跟上时间单位：
- ms,毫秒
- s,秒
- m,分钟
- h,小时
- d,天，认为一天24h
- w,周，一周7天
- y,年，一年365天


持续时间可以通过串联来组合。单位必须按照从最长到最短的顺序排列。给定单位在一段时间内只能出现一次。

以下是有效持续时间的一些示例：
```
5h
1h30m
5m
10s
```
### offset modifier
```offset``` modifier允许改变单个Instant vector和Range vector的时间偏移。
例如说，返回相对于当前查询评估时间过去 5 分钟的 http_requests_total 值：
```
http_requests_total offset 5m
```
请注意，offset modifier始终需要紧跟在selector后面，即以下内容是正确的：
```
sum(http_requests_total{method="GET"} offset 5m)
```
以下格式是不正确的：
```
sum(http_requests_total{method="GET"}) offset 5m // 无效。
```

这同样适用于范围向量。

例如将返回 http_requests_total 一周前的 5 分钟速率：
```
rate(http_requests_total[5m] offset 1w)
```
当查询过去的样本时，负偏移量将启用时间向前的比较：
```
rate（http_requests_total[5m] offset -1w）
```



