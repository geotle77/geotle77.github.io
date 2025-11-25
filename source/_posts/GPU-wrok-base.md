---
title: 国科大GPU架构与编程25秋大作业二入门指南
date: 2025-11-20 19:29:03
tags: GPU,课程，大作业
categories: 课程
index_img: /img/index_img/GPU_work_base.png
---

# GPU大作业入门指南
本教程旨在提供一个基本的入门指南，专门为零基础同学打造的完成大作业二的教程，仅限基础题。
<!--more-->

## 基本要求

首先快速回顾一下大作业二的要求： 

- 选择一个赛道：摩尔线程，沐曦科技，并行科技 
- 根据教材《Programming Massively Parallel Processors: A Hands-on Approach》要求的章节生成高质量的问答对.[PMPP](https://www.sciencedirect.com/book/9780128119860/programming-massively-parallel-processors)。
    - 基础题：Chap 2,3,4,5,6
    - 加分题：Chap 1,2,3,4,5,6,7,13,16,17,20
- 选择一种开源大模型：DeepSeek,Qwen,Llama等  
- 选择一个大模型微调框架
    - 摩尔线程：[Llama-Factory](https://llamafactory.readthedocs.io/en/latest/)
    - 并行科技&沐曦科技：[Unsloth](https://docs.unsloth.ai/)
- 模型微调
    - 基础题：使用生成的问答对进行低秩矩阵微调（lora）,输出标准的大模型文件（huggingface transformers）
    - 加分题：RAG,PPO,RLHF,SFT etc. 策略进行模型准确率优化
- 模型推理部署
    - 基础题：使用大模型进行推理，输出结果，不必要使用推理引擎部署
    - 加分题：使用vllm,SGlang等进行推理部署，并根据硬件架构，使用CUDA,PTX,Triton等编程模型加速推理框架的算子。做一个UI界面，起一个响亮的名字🥹

**考核要求**  ：

- 速度（Tokens/s）
- 给定测试集上的准确率+专家打分

## 背景介绍
没有AI大模型训练经验基础的同学可能会对上述任务一头雾水，包括什么叫做微调，这堆名词（PPO,Lora,SFT etc.）是什么意思，llama-factory，unsloth等是什么，vllm，sglang等又是什么。

### 大模型基础知识
我们先快速过一遍大模型的基本原理，首先现代几乎所有大模型都是基于Transformer架构的，关于Transformer的详细介绍可以参考我之前的博客文章[Transformer的原理与应用](https://geotle77.github.io/2025/10/03/To-know-about-Transformer/)。

原版 Transformer 由 Encoder + Decoder 两部分组成，但现在几乎所有语言大模型都只保留 Decoder-only（仅解码器） 架构，这是 GPT、Qwen、DeepSeek、Llama 等模型共同的基础。这里的原因简单来说是因为所有 LLM 的根本任务都是一样的——
根据前文预测下一个 token。对于生成任务而言，语言模型的“输入”和“输出”其实都在同一个序列上，Transformer 的 Decoder带有 mask self-attention（只看前面，不看后面），用户输入一部分内容，模型根据输入继续进行接下来的输出。所以decoder是天然适合这种生成任务的，与之对应如果是翻译或者seq2seq任务，就是encoder更擅长。其实最主要的原因还是因为便宜，Decoder-only 在规模化训练下效果最好、最稳定，继续保留encoder反而会增加多余的训练成本。
![decoder-only](/img/pics/GPU-work-base/decoder-only.png)

强调这一点是因为让我们大模型的架构有一个最清晰的认识，专注在decoder结构，帮助理解各家大模型的区别到底在哪。

#### 大模型常见的一些参数
**Token**：Token在大模型中是最基本的文本单元，意味着任何序列都是由这些token组成的。如果学过NLP就知道，这些token并不一定是一个word或者一个字，而是有可能会被拆分为更小的部分。比如说"preview"就会被拆分为"pre"和"view"。为什么不直接用字母呢？如果只有英文训练预料，词表甚至只有26个，但是这样的话模型就很难学到一些长距离的依赖关系，比如说一个字母p后面可能是任何一个其他字母，模型很难学到p后面跟着什么字母的概率。所以词表不能太大，也不能太小。与token最直接相关的关键词就是上下文长度(context)，128k,1M等，它们的意思就是词表里有多少个token,也就是输出矩阵的维度。

**Embedding**：Embedding是token的向量表示，它将token转换为数值向量，这个向量的维度就是embedding的维度，比如768,1024等。Embedding的维度越高，模型的表达能力就越强，但是训练成本也越高，这也就是输入矩阵大小的另一个决定性因素。比如gpt3时的词表大小是50257，嵌入向量的维度是12288.

**温度**：温度 (Temperature) 控制模型生成内容的随机性和创造性。数值通常在 0 到 1 之间（有些模型可到 2）。

- 低温度 (0.1 - 0.3)： 模型变得极度保守、确定。它会每次都选概率最高的那个字。适合：代码生成、数学解题、事实问答。
- 高温度 (0.7 - 1.0)： 模型变得活跃、发散。它会尝试选择概率没那么高的字，带来意想不到的组合。适合：写诗、头脑风暴、创意写作。

可以直接验证的是，如果将温度调为0，模型的输出会变得非常确定，那么同一个prompt下，模型的输出都是一样的。

### 大模型异同
各家大模型都是基于transformer架构，并且还是decoder-only,那为什么能力参差不齐呢？

可以把差异分成三大类：  
（1）架构层面.    
（2）训练层面（最核心）.   
（3）推理/工程层面.   

#### 架构层面
虽然都是 Decoder-only，但每家在 Transformer Block 里做了一些小改动，例如：

- Attention 机制的不同
	- 原始 Attention（GPT-2/GPT-3）
	- SwiGLU + Multi-Query Attention（Llama系）
	- Grouped-Query Attention (GQA)（大部分新模型）
	- 推理更快、KV Cache 更小
	- Chunked Attention / Multi-head Latent Attention（DeepSeek）

- 位置编码（Positional Encoding）
    - GPT ：Learned PE（可学习位置）
    - Llama/Qwen：RoPE（旋转位置编码）
    - DeepSeek-V3：Dynamic NTK / YaRN

- 激活函数（FFN）
    - ReLU（旧时代）
    - GeLU（GPT-3）
    - SwiGLU / ReGLU（Llama/Qwen/DeepSeek）

- 归一化策略
    - RMSNorm（Llama/Qwen/DeepSeek）
    - LayerNorm（GPT 系列）
    - DeepNorm/PostNorm 变体（Ziya 等）

我们并不需要关心具体是如何实现的，只需要知道各家大模型的架构主要的区别就集中在这几个部件上，还有近来比较热门的Moe模型，也引入了一些新的技术。

#### 训练层面
实际上，真正影响大模型能力的，还是训练层面。这主要体现在各家大模型：  

- 用了多少数据
- 用什么 loss，训练目标是什么
- 用什么训练技巧
- 是否做了对齐 RLHF、SFT

比如说不同公司会在 pretrain 时加入：

- next-token prediction（主任务）
- fill-in-the-middle（FIM，Llama 用）
- prefix LM（部分模型）
- masked attention patterns



#### 推理/工程层面  

最后就是影响实际体验的部分，同样大小的模型，它们差异可能来自以下优化：

- KV Cache 优化（PagedAttention、FlashAttention-2/3）
	- vLLM 推力最大
	- DeepSeek-V3 更进一步的 Chunked Attention
	- Qwen 2.5 做了 FlashDecoding 优化

- 权重量化技术，量化能力影响 显存需求 × 推理速度，对实际用户影响巨大。
	- Llama/Qwen → 非常适配 AWQ/GPTQ/INT8/FP8
	- DeepSeek → 特别适配 INT4/FP8 推理

#### 参数量的区别  

对于同款架构（通常指基于 Transformer Decoder-only 的架构，如 Llama、GPT 系列）的大模型，参数量的区别主要体现在 “深度”（层数） 和 “宽度”（隐藏层维度） 这两个核心维度的变化上。具体来说，参数量的差异主要体现在以下几个具体的结构参数和权重矩阵上：

核心差异来源：两个关键超参数当一个模型从“小杯”（如 7B）扩展到“超大杯”（如 70B）时，架构逻辑不变，变的是以下两个数值：  

- Hidden Size ($d_{model}$)：隐藏层维度（宽度）。这是影响最大的因素，因为参数量与它大致呈平方关系。
- Number of Layers ($N$)：Transformer Block 的层数（深度）。参数量与它呈线性关系。

一篇写得很好的计算参数量的文章[GPT2参数量计算](https://michaelwornow.net/2024/01/18/counting-params-in-transformer)

### 模型训练
基于上面部分的介绍，大家已经可以大概选择一个适合的大模型来进行微调。这里有一个有意思的网站可以用来计算模型需要的显存：[GPU-poor](https://rahulschand.github.io/gpu_poor/).

选择了一个模型后，接下来咱们简单介绍一下微调是什么意思。

要知道的是，现在的所有大模型都已经在大量的世界数据上进行了预训练，但是针对具体的场景可能没法涵盖全部的知识。微调（Fine-tuning）是大模型应用的最常见方式，它通过在特定任务上进行训练，让模型能够更好地理解和生成与任务相关的文本。根据微调方式的不同，又可以分为PEFT,FFT,SFT,PPO,DPO等。 

- 按照“更新参数的规模”分类可以分为FFT和PEFT等，它们是训练的实现方式
- 按照“任务类型”分类可以分为SFT和RLHF等，它们是训练的具体目标


#### 训练实现方式

##### 全量微调 (Full Fine-Tuning / FFT)
全量微调 (Full Fine-Tuning / FFT)的原理是解冻模型的所有参数，对整个模型的权重进行更新。相当于把整个大脑的知识重新梳理一遍。全量微调的优点是效果上限最高，能彻底改变模型的行为模式。但缺点显而易见就是极度烧钱。需要巨大的显存（通常是模型大小的 3-4 倍以上），还可能出现“灾难性遗忘”（忘了原本通用的知识）。

##### 参数高效微调（Parameter-Efficient Fine-Tuning）
参数高效微调（Parameter-Efficient Fine-Tuning） 的原理是冻结住大模型原本的参数（不改动），只在旁边“外挂”一些小型的参数模块来训练。

核心技术包括：

- Adapter Tuning：较早期的技术，在层与层之间插入小型的神经网络层（Adapter）。

- P-Tuning / Prefix Tuning：不改动模型主体，而是在输入端训练一些“虚拟的提示词向量”（Soft Prompts），相当于训练一个万能的 Prompt。

- LoRA (Low-Rank Adaptation)：【当前统治级的方法】 LoRA 的出现极大降低了微调门槛。对于一个 7B 的模型，LoRA 可能只需要训练 0.1% - 1% 的参数，这让消费级显卡（如 RTX 3090/4090）微调大模型成为可能。

- QLoRA：LoRA 的量化版。先把主模型压缩成 4-bit（大幅降低显存占用），在这个量化模型的基础上加 LoRA。这是目前个人开发者最常用的方案。

LoRA 的设计非常优雅，它完美诠释了数学在工程优化中的力量。直觉假设（Intrinsic Dimension Hypothesis）：工程师们发现，大模型虽然参数巨大，但在处理特定任务时，真正起作用的“有效维度”其实很低。也就是说，权重的更新量 $\Delta W$ 不需要是满秩的，它可以通过两个极小的矩阵相乘来近似。具体来讲
$$
h = W x
$$
若进行全参数微调，我们更新的是整个矩阵 $W \in \mathbb{R}^{d_{\text{out}}\times d_{\text{in}}}$,但是LoRA 假设：

> 大模型微调时，权重的更新 $\Delta W$ 通常是**低秩**的。

所以 LoRA 用一个低秩分解表示微调的更新量：

$$
\Delta W = B A
$$

其中：

- $A \in \mathbb{R}^{r \times d_{\text{in}}}$   
- $B \in \mathbb{R}^{d_{\text{out}} \times r}$
- $r \ll \min(d_{\text{in}}, d_{\text{out}})$，如 4、8、16 等

这样：

- 原来一个 $d_{\text{out}}\times d_{\text{in}}$ 的大矩阵不动
- 只训练 A, B 这两个“小矩阵”

最终输出变成：

$$
h = W x + B A x
$$
也可以写为：

$$
h = (W + \Delta W)x
$$
但是 W 是冻结的，不会更新。完美！

####  有监督微调 (SFT - Supervised Fine-Tuning)
有监督微调 (SFT - Supervised Fine-Tuning)是最基础的微调目标。通过喂给模型成对的 (Prompt, Response) 数据教会模型“特定的知识”。它能够让模型学会遵守指令、结构化输出和做有用的任务（总结、回答、解释）


#### 对齐训练（Alignment）
对齐训练就是让“懂很多知识”的 AI，变成一个“符合人类价值观、听懂人话、且安全”的助手。如果说预训练（Pre-training）是让模型“读万卷书”（获得智力），那么对齐训练就是教模型“做人”（符合价值观）。

- **RLHF（Reinforcement Learning from Human Feedback）人类反馈强化学习**用人类偏好来优化模型行为。

流程是：

1. SFT（先让模型会说话）

2. 训练奖励模型（Reward Model）

$$
r = R_\phi(x, y)
$$

3. 强化学习优化策略（PPO/PPO-ptx）

$$
\max_\theta \mathbb{E}_{y\sim\pi_\theta}[R_\phi(x,y)]
$$

- **DPO(Direct Preference Optimization)直接偏好优化**，是 RLHF 的无强化学习版。

数学形式：
$$
\max_\theta \log \sigma\left(\beta [\log \pi_\theta(y^+)-\log \pi_\theta(y^-) ]\right)
$$
它不需要 PPO，训练更稳定，效果更好。

- **除此之外**，还有
    - ORPO：用 KL 约束约束偏好
    - KTO：OpenAI 小模型对齐方案
    - GRPO：聚合奖励
    - RLAIF：用模型输出作为偏好

#### 知识增强

- **RAG（Retrieval-Augmented Generation）**

RAG并不是一种训练方式，也不是训练目标，它只是作为一种“增强方式”，让模型在针对具体领域是避免幻觉和出错。

数学结构：

$$
y = f_\theta(x, \text{Retrieve}(x))
$$

- **蒸馏（Distillation）**

蒸馏是让大模型 → 变小模型

数学上：

$$
\min_\theta \text{KL}(\pi_\theta \,\|\, \pi_{\text{teacher}})
$$

#### 总结

我们可以把大模型的生命周期看作一个从“通识教育”到“专业就业”的过程，各个技术环节环环相扣：

1.  **预训练 (Pre-training)**
    这是**通识教育**阶段。模型阅读海量文本，学会了语言的规律和世界的通用知识（如语法、逻辑、常识）。此时的模型像一个博学的“书呆子”，能续写文本，但不懂得如何对话或遵循指令。这是所有大模型能力的基石。

2.  **后训练 (Post-training)**
    这是**职业培训**阶段，通常包含两个核心步骤：
    *   **SFT (指令微调)**：教模型“听懂人话”，学会问答、翻译、总结等具体任务形式。
    *   **Alignment (对齐)**：通过 RLHF 或 DPO 教模型“懂规矩”，符合人类价值观，不胡说八道。
    *   经过这一步，Base Model 变成了 Chat/Instruct Model（如 Llama-3-Instruct），这也是我们大多数时候直接调用的模型。

3.  **微调 (Fine-tuning)**
    这是**在职深造**。当我们有特定的垂直领域需求（如医疗、法律、公司内部代码库）时，通用的 Instruct 模型可能不够用。我们需要用特定领域的数据对模型进行微调（通常使用 LoRA 等高效手段），让它成为某个领域的专家。

4.  **知识增强 (RAG)**
    这是**外挂知识库**。即使是微调过的专家，也不可能背下所有最新的实时数据（如今天的股价、公司最新的文档）。RAG 就像是给专家配了一个搜索引擎或参考书，让他回答问题时先查阅资料，确保准确无误。

**相互依赖关系总结：**

*   **基座模型 (Base Model)** = 预训练
*   **聊天模型 (Chat Model)** = 基座模型 + SFT + 对齐
*   **行业模型 (Domain Model)** = 聊天模型 + 领域微调 (Fine-tuning)
*   **行业应用 (Application)** = 行业模型 + RAG (知识增强) + Agent (工具调用)

## 大作业二实操指南
现在开始，让我们一步步实操来完成大作业二的基础版，并简单引入一下加分题。

### 1. 首先是微调数据集准备
咱们的数据集很简单，这一步我们的目标是**依赖教材内容来生成问答对**，所以完成这一步其实有很多思路，

- 最最最naive的思路：  
就是人工去一问一答，每一个章节生成一二十个问答对。这样做的优点达到了老师说的复习的目的，问答对生成结束后肯定学明白了，缺点是费时费力，并且准确率和效果很难保证。
- 稍微进阶一点的思路（适合入门）：
这种稍微进阶一点，其实就是将章节内容复制给一个大模型，然后让大模型根据章节内容生成一个高质量的问答对。举例来说，你的prompt可以是：

```text
你是一名 GPU 编程教材内容整理助手，需要从《Programming Massively Parallel Processors》和 GPU 架构资料中生成高质量的问答对。

请严格遵守以下规则：

1. 每个问题必须能够在不依赖任何上下文、图片、公式、代码块、图示的前提下独立成立。

   - 禁止出现“如下图所示”、“根据上面的代码”、“从前面的公式”、“如教材中的图 5.3” 等表述。

2. 生成的问题必须清晰、明确、具体，不允许含糊或指代模糊的描述。

3. 回答必须基于教材公认知识，语言清晰、技术准确、解释性适当。

4. 每条问答必须围绕 GPU 架构、CUDA、并行编程、性能优化、memory hierarchy 等核心主题，不允许偏题。

5. 不要生成编造的背景、示例、数据、图表，也不要提及任何不存在的上下文。

6. 回答中不能包含“如前所述”“见下图”“代码略”等弱化信息。

保持风格：技术准确 + 简明易懂 + 面向学生。
```
    
这里其实用到了一个trick，那就是强调了让模型不要无中生有，假设文本中含有一个图片的解释，那么直接问模型就会莫名生成一个结果，尽管问题中完全没提到图表包含哪些信息。也就是需要考虑问题是否独立成立，是否引用不存在的上下文内容，是否超出教材范围，是否符合微调要求（不冗长、不幻觉）。避免大量“坏样本”的生成

- 进阶的做法（pipeline）
这里其实就是用现成的工具，把文本分块，清洗，模型调用，QA生成和数据集封装整个pipeline全部封装在一起了，只需要简单的配置就可以生成高质量的问答对。目前比较好用的工具有[easy-dataset](https://github.com/ConardLi/easy-dataset),[Qanything](https://github.com/netease-youdao/QAnything/),[llamaindex](https://www.llamaindex.ai/) etc.
这部分工具的好处就是全自动流水，极大节省了时间，但缺点就是需要花费一定的学习的时间成本。

注意到，无论是哪种方式，最终都应该根据微调工具所提供的数据集模板准备好数据集，例如说大多数通用的数据集模板Alpaca的格式就是

```json
"alpaca_zh_demo.json"
{
  "instruction": "计算这些物品的总费用。 ",
  "input": "输入：汽车 - $3000，衣服 - $100，书 - $20。",
  "output": "汽车、衣服和书的总费用为 $3000 + $100 + $20 = $3120。"
},
```
实际训练时，模型会将instruction和input拼接在一起作为prompt，output作为label，进行微调。

>⚠️：这里还需要注意到一点是由于我们的数据集是自行准备的，所以数据集目录下还需要提供一个data_info.json文件（llama-factory工具需要），其中指定了数据集的名称，数据集的地址等信息。例如：
```
{
  "train": {
    "file_name": "datasets.jsonl",
    "columns": {
      "prompt": "instruction",
      "query": "input",
      "response": "output"
    }
  }
}
```
一个数据集的例子：![dataset](/img/pics/GPU-work-base/data_example.png)


### 2. 微调
这里我主要介绍llama-Factory的微调方法，其实准备好数据集后，后面的过程就非常简单了。根据llama-Factory的文档，配置好环境。

```bash
git clone --depth 1 https://github.com/hiyouga/LLaMA-Factory.git
cd LLaMA-Factory
pip install -e ".[torch,metrics]"
```

不少同学可能会卡在这一步，pytorch等一些库容易出问题（⚠️务必注意cuda版本，不然不能使用本地GPU）.但这个官方写的教程很清晰了[llama-Factory](https://llamafactory.readthedocs.io/en/latest/getting_started/installation.html)，真遇到问题只能说活用AI了，假设大家成功配置了环境，并且能够运行 `llamafactory-cli` 命令，接下来就可以愉快玩耍了。

### 3. 下载大模型
选择一个大模型后，就需要将其下载到本地来进行微调，现在下载大模型的渠道主要是[huggingface](https://huggingface.co/)和[modelscope](https://modelscope.cn/),前者可以访问全球的绝对多数开源模型，后者是国内的模型仓库，如果遇到网络问题可以用modelscope来下载模型。如果是用huggingface，一些模型可能还需要先获得许可（比如说meta的llama模型系列），而国内的开源模型基本不需要认证。

以huggingface为例，下载一个llama模型的命令如下：

首先是登陆huggingface账号,在官网上注册后可以拿到登陆用的token。
```bash
huggingface-cli login
```
然后下载
```bash
huggingface-cli download meta-llama/Meta-Llama-3-8B-Instruct --local-dir ./Llama3-8B-Instruct --include="*"
```

- meta-llama/Meta-Llama-3-8B-Instruct 是模型仓库名
- --local-dir 设定你要存放模型的目录
- --include="*" 表示下载全部文件（权重 + 配置 + tokenizer）

当然也可以直接从huggingface官网下载，然后解压到你设定的目录即可。

### 4.微调
微调这一步就是根据llama-Factory的文档，写好一个训练的yaml文件，其中指定了训练模型的地址，训练用的数据集地址，微调的参数等。

比如官方提供的一个lora微调的模板如下：

```yaml
### examples/train_lora/llama3_lora_sft.yaml
model_name_or_path: meta-llama/Meta-Llama-3-8B-Instruct

stage: sft
do_train: true
finetuning_type: lora
lora_target: all

dataset: identity,alpaca_en_demo
template: llama3
cutoff_len: 1024
max_samples: 1000
overwrite_cache: true
preprocessing_num_workers: 16

output_dir: saves/llama3-8b/lora/sft
logging_steps: 10
save_steps: 500
plot_loss: true
overwrite_output_dir: true

per_device_train_batch_size: 1
gradient_accumulation_steps: 8
learning_rate: 1.0e-4
num_train_epochs: 3.0
lr_scheduler_type: cosine
warmup_ratio: 0.1
bf16: true
ddp_timeout: 180000000

val_size: 0.1
per_device_eval_batch_size: 1
eval_strategy: steps
eval_steps: 500
```
调整其中的参数，再执行命令就可以美美开始微调了：

```bash
llamafactory-cli train examples/train_lora/llama3_lora_sft.yaml
```

至于参数是什么意思就自行查阅了。

这里补充一小点，就是其实llama-factory提供了webui，可以一键式微调，非常方便，强烈推荐用这个试一下！

至于Unsloth，它是专门针对 Llama/Mistral 等模型进行极致优化的微调库，速度比 HF 快 2-5 倍，显存占用更低。
如果你选择 Unsloth 赛道，推荐直接使用官方的 Colab Notebook 进行体验，或者本地安装：

```bash
pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
```

Unsloth 的使用逻辑和 HF 很像，但需要加载 `FastLanguageModel`。

### 5.推理  

训练好大模型后，接下来就是检验训练的成果了。也就是将大模型部署起来，然后一问一答，这个过程就是加分题核心优化的地方。但对于基础题来说，llama-factory提供了一个chat的接口，可以直接将lora微调的参数和模型的全参数合并在一起进行推理，并展示聊天UI界面。所以基础题其实很简单，真正写代码的地方并不多，准确地说，甚至不需要写代码。

至于加分题，就需要用到专门的推理引擎来部署，推理引擎的主要任务就是通过优化，让模型的推理速度更快，显存占用更低。可以通过优化其中的部分算子实现特定模型的加速，所以就是狠狠优化就行了😋！

### 6.总结  
根据我的实操，一个7B的模型实际训练的时候峰值甚至会达到50G+的显存，比我想象中还要多。但实际推理的时候只需要用到15GB显存。这里需要说明的一点是，显存占有那么高是因为我没有加量化，如果加了量化可能会更低。至于量化是什么，简单来说就是数据精度变少，比如bf16，fp16，fp8等，所需的存储空间也会变少。对于课程任务而言，7B的模型量级是足够了的，甚至还可以更mini，参数更小，模型推理越快，但准确率也会有一定的下降。这个就需要和实际的硬件相互权衡一下了。