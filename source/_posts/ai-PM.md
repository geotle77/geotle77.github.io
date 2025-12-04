---
title: AI赋能——vibe coding篇
date: 2025-11-25 14:12:18
tags: AI, Vibe coding
categories: ai-PM
index_img: /img/index_img/ai-PM.png
sticky: 96
---

这篇博客是我想尝试一下如何以项目经理的视角来分析一个AI产品。这之后或许将成为一个合集，这次我会最开始以Vibe coding为例，来分析一下市场上的code 工具的优劣和受众。
<!--more -->

# 什么是 Vibe Coding？
传统的 coding，是一个清晰但繁琐的过程： 

>想法 → 需求拆解 → 代码编写 → 环境配置 → 调试 → 修复 Bug → 构建 → 部署 → 交付

这其中每一步都要靠人亲手完成，实际上可能80% 的精力其实在写“中间过程”，而不是在解决真正的问题。

Vibe coding（氛围编程）是一种人工智能辅助的软件开发技术，开发人员使用自然语言指导人工智能构建什么，而不是逐行编写传统代码。 该过程由 Andrej Karpathy 于 2025 年初推广，涉及通过对话方式引导 AI 生成、完善和调试代码，从而实现更快的开发并使编码经验有限的人更容易使用。这些工具不再要求“一行行写代码”，而是强调一种新的协作方式：**告诉 AI 你想做什么，AI 反向推导并帮你完成代码和实现。**  

AI 会在这个过程中负责：生成代码，分析整个项目，修改多文件，运行命令，修 bug，生成 UI，写文档，甚至自己部署。**而用户的角色，则转变成了一个真正的“产品决策者 + 审阅者 + 监督者”。**

一言以蔽之：**vibe coding = 意图驱动开发 + AI 自动化实现。**
{% img /img/pics/ai-PM/workflow.png "一个典型的vibe coding工作流" %}

vibe coding 不会完全取代程序员，但是它会改变程序员的工作方式。

因此未来开发者的价值在于：

- 能否清晰表达需求
- 能否设计合理的结构
- 能否评估方案的可行性
- 能否验证和把控 AI 产出的质量

{% note success %}
每个程序员都会变成一个更强的“系统设计者”，而不擅长编码的人，这从某一种方面来说是降低了程序员这个职业的门槛，但从另一方面来说，却也促使高级程序员往系统决策，项目规划的方向发展，而不仅仅只停留在完成需求的阶段。
{% endnote %}

# 市场分析  
现在市场上有非常多的AI辅助编程的产品，市场研究显示，AI 辅助编码（包含 vibe coding）目前规模在 几十亿美元级别。例如，根据一份报告[mktclarity](https://mktclarity.com/blogs/news/vibe-coding-market?utm_source=chatgpt.com),
2025 年 AI 编码工具市场规模在约 US $6-12 billion 之间。

{% note info %}
vibe coding 市场绝非小规模“工具增量”，而是一个正在被快速塑造、潜在巨大、竞争激烈的新赛道。
{% endnote %}


为什么大模型在编程领域落地最快？ 从底层逻辑看，代码是高结构化、语法有限且逻辑严密的文本数据。大模型通过学习海量 GitHub 代码，天生具备了极强的结构理解力。

但以 PM 的视角来看，市面上眼花缭乱的 Vibe Coding 产品（如 Cursor, Windsurf, Devin 等），其核心技术壁垒并非仅仅在于模型本身，而在于工程化能力：

- 上下文构建（Context Management）： 如何将整个项目、文档、依赖关系高效地“喂”给模型？

- 工具链调用（Function Calling）： 如何精准地让 AI 执行终端命令、文件读写和部署操作？

许多看似神秘的产品，本质上是**“优秀的 Prompt 工程 + 高效的上下文索引机制 + 自动化工具链”的组合。这意味着，单纯的技术门槛正在快速下降，产品的易用性和交互体验**将成为决胜关键。
{% img /img/pics/ai-PM/cursor_workflow.png "cursor IDE工作流" %}
并且，从产品角度来看，虽然一些公司估值已高，但大量工具仍处于拓用户阶段，但如何把“免费用户”转为“付费企业客户”是关键，很多产品没法产生用户黏性，最终也胎死腹中。

另一方面，不少vibe coding 工具背后使用的大模型、推理资源、集成工具链等其实都是第三方的产品，如何通过大规模用户量来降低成本，是每个产品都需要考虑的问题。最后尤其是国内合规市场，对数据安全、模型安全、可控可审非常看重，合规问题也是每个产品都需要考虑的问题。

{% img /img/pics/ai-PM/eco_sys.png "vibe coding 市场分析" %}

# 产品介绍 
现在进入正题，我将介绍几款现在市场上比较热门的vibe coding产品，并从分析它们的核心竞争力和针对的目标用户群体。

```mermaid
graph LR
    %% 定义主要分类节点
    Web["☁️ 网页/云原生<br>(Web-based)"]
    IDE["🖥️ AI 原生 IDE<br>(AI-Native Clients)"]
    Plugin["🧩 IDE 插件/扩展<br>(Extensions)"]
    Auto["🤖 自主工程师<br>(Autonomous)"]
    CLI["⌨️ 命令行工具<br>(CLI Tools)"]

    %% 定义产品实例
    P_Web("Lovable / v0 / Replit")
    P_IDE("Cursor / Windsurf / Trae")
    P_Plugin_Adv("Cline (Roo Code)")
    P_Plugin_Basic("GitHub Copilot / Comate")
    P_Auto("Devin")
    P_CLI("Kimi CLI / Claude Code")

    %% 定义场景
    S_Fast("场景: 快速建站/MVP验证<br>(零环境配置)")
    S_Pro("场景: 专业主力开发/系统设计<br>(深度上下文)")
    S_Agent("场景: 极客体验/开源Agent<br>(透明可控)")
    S_Corp("场景: 企业合规开发<br>(稳健补全)")
    S_Outsource("场景: 独立任务/旧系统迁移<br>(全自动)")
    S_Deep("场景: 超长文档/日志分析<br>(终端操作)")

    %% 连接关系
    Web --> P_Web --> S_Fast
    IDE --> P_IDE --> S_Pro
    Plugin --> P_Plugin_Adv --> S_Agent
    Plugin --> P_Plugin_Basic --> S_Corp
    Auto --> P_Auto --> S_Outsource
    CLI --> P_CLI --> S_Deep

    %% 简单的样式区分 (如果支持)
    style Web fill:#e1f5fe
    style IDE fill:#fff3e0
    style Plugin fill:#e8f5e9
    style Auto fill:#f3e5f5
    style CLI fill:#eceff1
```

## 网页端
Web 平台的产品能够浏览器里直接 vibe coding，一部分甚至可以进行部署，此类产品适合快速建站、MVP验证等场景。 

### YouWare
定位：「世界上第一个 vibe coding 社区」——更偏创作者& 半技术人，用语音/自然语言快速生成网站和 App.[youware](https://www.youware.com/)

特点：

- 从 prompt 或语音描述生成 HTML/CSS/JS 页面，可一键上线。
- 强社区属性，有大量别人做好的项目可以 remix，类似 “TikTok + GitHub”。
- 明确打出「vibe coding」概念，把编码体验做成「滑动刷创意、点一点就上线」。

适用场景：
- 运营、市场、内容创作者快速做活动页、个人主页、简单工具.

{% img /img/pics/ai-PM/youware_try.png "使用youware生成的一份简易的个人主页" %}

价格：有 免费层，新用户默认有500credits.

### Replit
**定位：**在线 IDE + AI Agent，「一个浏览器 tab = 开发机 + CI + 部署平台」。 [replit](https://replit.com/)

{% img /img/pics/ai-PM/replit.png "replit icon" %}

特点：

- Replit Agent 可以从一句话开始全程搭项目、并且直接一键部署上线。
- 和传统 Ghostwriter 的「补全」不同，replit agent会跑测试、开浏览器检查页面。

适用场景：

- 没本地开发环境的学生 / 初学者。
- 想做「一键分享可运行 demo」的黑客松/教学场景。

### v0.dev
定位：**AI 生成 React + Tailwind UI 的前端利器，本质上更像一个「Prompt-to-UI 设计工具」。** [v0.dev](https://v0.dev/)


特点：

- 输入自然语言描述，例如「带侧边栏和图表的仪表盘」，直接吐出高质量 React 组件。
- 和 Vercel / Next.js 生态强绑定，一键部署到生产。
- 最新版本强调「agentic」，不只是 UI，还会规划数据源、逻辑和部署链路。

适用场景：  

- 设计+工程混合角色：快速从 idea 到可跑的 demo。

可以利用v0 来做一个非常美观和动态感的dashboard界面。
{% img /img/pics/ai-PM/v0-dashboard.png "使用v0.dev生成的dashboard界面" %}

### lovable
定位：**从一句话 prompt → 完整 SaaS / Web App，主打「给非程序员用的 app builder」。** [lovable](https://lovable.dev/)

特点：

- 直接生成多页面应用：路由、表单、认证、数据库集成都能生成。
- 和 v0、Cursor 等相比，Lovable 更偏「帮你把产品起盘」。

适用场景：

- 想快速验证商业想法的创业者/产品。
- 不想管 infra，只想看到「能跑起来的产品」。

## IDE 插件/扩展端
此类工具是嵌入现有编辑器（VS Code, JetBrains），作为副驾驶或代理存在。

### GitHub Copilot:
[GitHub Copilot](https://github.com/features/copilot),Github Copilot的出现足以是载入史册的一笔，它真正意义上开启了Vibe coding时代。

1. 历史地位：编程界的“iPhone 时刻”
在 2021 年 GitHub Copilot 横空出世之前，AI 辅助编程大多停留在简单的语法提示或学术研究阶段。

Copilot 的出现是一个分水岭。它第一次让 AI 真正“理解”了代码上下文，能够生成数行甚至整个函数体的可用代码。它不仅是一款成功的产品，更是一种文化现象——它向全世界的开发者证明了：AI 不会立刻取代你，但它能成为你最强大的副驾驶（Copilot）。正是 Copilot 的成功，验证了这条赛道的巨大价值，才有了后来 Vibe Coding 生态的寒武纪大爆发。

2. 核心定义：AI 结对程序员 (AI Pair Programmer)
Copilot 的产品哲学非常明确，并且一直坚持至今：它不是来接管方向盘的，而是坐在副驾驶位上给你提供导航和建议的。

它的核心形态紧紧围绕着“辅助”展开：

- **Ghost Text (幽灵文本)**： 这是 Copilot 最具标志性的功能。当你打字时，它会以灰色斜体在光标后预判你接下来想写的代码。你只需轻轻按下 Tab 键，想法瞬间变为现实。这种极其顺滑、甚至有点上瘾的交互方式，奠定了早期 Vibe Coding 的基础体验——“心流（Flow）”。

- **Copilot Chat**： 随着 LLM 能力的提升，Copilot 也集成了侧边栏对话功能。你可以在这里提问、要求解释代码、生成单元测试或进行简单的重构。

3. Vibe Coding 体验：稳健、克制与安全感
与现在激进的 AI Agent（如 Cline 或 Devin）不同，Copilot 的 Vibe 是一种克制的智慧。

- **它从不越权**： 它不会在未经理你允许的情况下自动运行终端命令、删除文件或修改你没在看的文件。它极其尊重开发者的控制权。

- **它润物细无声**： 它的介入是微妙的。在你卡壳思考的那一两秒钟里，它给出建议；如果你不需要，继续打字，建议就会消失。它不想打断你的思路。

这种体验对于那些在大型企业工作、对代码安全性和可控性要求极高的资深开发者来说，提供了巨大的安全感。

4. 核心竞争力：生态壁垒与企业级信任
在 Cursor 等后起之秀在功能和体验上发起猛烈挑战的今天，Copilot 依然是市场占有率最高的老大，其底气在于：

- **无与伦比的生态整合 (Microsoft & GitHub)** 它不仅仅是一个插件，它是微软整个开发者生态的一部分。它深度集成在 VS Code、Visual Studio 中，并且与 GitHub 仓库、GitHub Actions、Azure 云服务有着天然的连接通道。

- **企业级信任与合规 (Trust & Compliance)** 对于世界五百强、银行或政府机构来说，他们可能不敢把代码交给一个成立两年的创业公司（如 Cursor），但他们信任微软。 Copilot Business/Enterprise 版提供了完善的数据隐私承诺、版权赔偿机制（IP Indemnification）和企业级管理后台，这是大规模商业落地的决定性因素。

- **模型的持续进化** 虽然早期基于 OpenAI Codex，但现在的 Copilot 后面也是强大的 GPT-4 系列模型，并且微软正在不断优化其延迟和上下文能力。

### Augment Code

[Augment code](https://www.augmentcode.com/)

很多开发者（尤其是大厂员工）不仅不能随便换 IDE（Cursor 是 VS Code 的 Fork 版，有些企业合规禁止使用），而且不仅要处理单一项目，还要面对数百万行的巨型代码库 (Monorepo)。Augment Code 的定位非常精准：做最好的 IDE 扩展，让用户留在原生的 VS Code 中，但提供比 Copilot 强得多的上下文能力和速度。

1. 核心功能与 Vibe Coding 体验

- 真正的“瞬时”补全 (Instant Functionality) Augment 最引以为傲的是它的速度。它的团队由构建过高性能系统（如 Pure Storage）的专家组成，他们对延迟有着变态的追求。

- Vibe 体验： 当你敲击键盘时，Augment 的建议几乎是零延迟出现的。它给人的感觉不是“AI 在思考”，而是“代码已经在那儿了”。这种极低延迟对于维持“心流”至关重要。


> 痛点： 普通的 Copilot 往往只能读取你当前打开的几个文件。如果你引用了一个定义在 50 个文件夹之外的函数，Copilot 经常会瞎编（幻觉）。

Augment 在本地/云端维护了一个实时更新的代码库索引。它真正“理解”你整个项目的所有函数、类和依赖关系。当调用一个偏门的内部 API 时，Augment 不仅能自动补全，还能准确预测参数类型，完全不需要手动去翻定义。

{%note success%}
在 Vibe Coding 的版图中，Augment Code自研了推理引擎和专有模型，专门针对代码补全的低延迟和长上下文进行了优化。这使得它在处理超大单体仓库（Monorepo）时的表现优于通用模型。当然，与此同时，它的收费也是最昂贵的，
{%endnote%}



### Cline (原 Claude Dev) / Roo Code:

[cline](https://docs.cline.bot/)
Cline 本身是一个框架，它最初是专为 Anthropic 的 Claude 3.5 Sonnet 模型设计的。实际上，目前 Claude 3.5 Sonnet 依然是驱动 Cline 表现最好的模型，因为它在代码生成和逻辑推理方面处于业界领先地位，且非常擅长遵循复杂指令。现在 Cline 已经支持多种模型提供商，包括 OpenAI (GPT-4o), Google Gemini, DeepSeek（深度求索）, 以及通过 OpenRouter 接入的各种模型。与 Cursor 每月 20 美元的订阅制不同，Cline 是免费的插件，但你需要提供自己的 API Key（例如 Anthropic API Key）。这意味着按量付费，成本透明，用多少付多少

总的来说，Cline 是 Vibe Coding 领域中“代理派（Agentic）”的杰出代表。它不仅展示了 AI 编写代码的能力，更展示了 AI 使用计算机进行软件工程任务的潜力。

核心优势: **配合 Claude 3.5 Sonnet 模型，是目前开源界最强的“AI 程序员”体验。支持按 Token 付费（BYOK），成本透明。**

[roo code](https://roocode.com/)
Roo Code 是一个基于 Cline（原 Claude Dev）源代码分叉（Fork）出来的开源 VS Code 扩展。它的核心定位和功能与 Cline 高度一致：一个在 VS Code 中自主执行编程任务的 AI Agent。它同样擅长使用工具、操作文件、运行终端命令，并依赖强大的大模型（如 Claude 3.5 Sonnet）来驱动。

为什么会出现 Roo Code？ 开源项目通常有两种发展模式：  

- 一种是核心团队稳健维护（如 Cline），
- 另一种是社区开发者为了更快地实现新想法而进行分叉。

Roo Code 的创建者（RooVetGit）和社区希望以比原版 Cline 更快的速度迭代功能、试验新想法，并支持更广泛的模型和 API。

Roo Code 相对于原版 Cline 的关键区别与特色：

- **更激进的功能迭代与社区响应速度** 这是 Roo Code 最大的特点。原版 Cline 的更新可能更注重稳定性和官方路线图，而 Roo Code 社区非常活跃，对用户需求响应极快。

- **更丰富的自定义与“人设”模式 (Custom Modes / Personas)** Roo Code 在用户体验上做出了一个非常有趣的创新：它允许你快速切换 AI 的“人设”或“工作模式”。这极大地增强了 Vibe Coding 的体验感。 你可以一键切换不同的配置文件，例如：

    - "Code Mode" (默认)： 专注于写代码、修 Bug，简洁高效。

    - "Architect Mode" (架构师模式)： 提示词被修改为侧重于高层设计、系统结构分析，而不急于写具体代码。

    - "Writer Mode" (文档模式)： 专注于编写 README、API 文档或技术博客。

    - "QA Mode" (测试模式)： 专注于编写测试用例、寻找漏洞。

这种模式切换本质上是在后台为你更换了一套预设的 System Prompt（系统提示词），但对用户来说，感觉就像是切换了不同专业的 AI 员工。

- **对模型生态的极致支持** 虽然 Cline 也支持多模型，但 Roo Code 在这方面走得更远：

    - 它对 OpenRouter 的集成更加深入和友好，让用户能方便地尝试各种小众或最新的模型。
    - 它对本地模型（如通过 Ollama 运行的模型）的支持通常也更好，满足了隐私至上用户的需求。
    - 它允许更细粒度地配置不同模型的参数（如温度等）。

- **UI/UX 的微调** Roo Code 在界面细节上做了一些改进，例如更清晰的消息历史记录展示、 Token 使用量的实时统计等，试图提供比原版更顺滑的操作体验。


### Comate (百度):
[comate](https://comate.baidu.com/zh)
在 AI 编程工具的全球版图中，Comate 是中国大模型厂商在开发生态领域交出的一份重要答卷，它在国内开发者的 Vibe Coding 体验中占据着独特的生态位。

**🐼 Baidu Comate：更懂中文与中国开发者的 AI 结对程序员**

1. 什么是 Comate？
Baidu Comate 是百度基于其自研的文心大模型（ERNIE Bot）打造的一款智能代码助手。它的形态主要是 IDE 插件/扩展，支持 Visual Studio Code、JetBrains 全系列（IntelliJ IDEA, PyCharm, WebStorm 等）以及 Xcode 等主流开发环境。

核心定位： AI 结对程序员（AI Pair Programmer）。这一定位与 GitHub Copilot 类似，旨在嵌入开发者现有的工作流中，提供实时的辅助。

核心驱动： 百度文心大模型。经过海量代码数据和中文技术文档的训练，它在理解中文意图和生成符合国内开发习惯的代码方面具有先天优势。

Slogan： “帮你想，帮你写，帮你改”。

2. 核心功能与 Vibe Coding 体验
Comate 的功能设计覆盖了编码的全生命周期，带来了流畅的 Vibe Coding 体验：

- **实时代码续写与补全 (Ghost Text)** 这是最基础也最高频的功能。当你输入代码时，Comate 会像幽灵一样在光标后以灰色斜体显示建议代码。

- **Vibe 体验**： 你只需思考逻辑和命名，按下 Tab 键，AI 帮你完成剩下的样板代码。它支持单行补全、多行函数体生成，甚至能根据注释直接生成完整代码块。

- **侧边栏智能对话 (Chat Mode)** 类似于 Copilot Chat，Comate 在 IDE 侧边栏提供了一个对话窗口。

3. 企业级知识库增强 (RAG) —— 杀手锏功能 这是 Comate 区别于通用版 Copilot 的一大核心优势，尤其对于企业用户而言。

痛点： 通用大模型不知道你公司内部的私有框架、API 规范或业务逻辑。

Comate 对此提出的解决方案是： 它支持接入企业私有的代码仓库、技术文档和 API 文档。利用检索增强生成 (RAG) 技术，当你在写公司内部业务代码时，Comate 能够检索相关的私有知识，给出符合公司规范的、准确的代码建议。

4. 独特的竞争优势（为什么选择 Comate？）
中文理解能力的压倒性优势： 虽然 GPT-4 等国外模型中文也不错，但在处理复杂的中文业务逻辑描述、特定领域的中文术语以及生成地道的中文注释/文档方面，文心大模型表现得更加自然和准确。

网络与服务的稳定性： 对于国内开发者来说，Comate 的服务节点在国内，访问速度快、连接稳定，不存在网络连接障碍，这对于需要极低延迟的实时代码补全功能至关重要。

企业级安全与合规： 百度提供了私有化部署或专有云服务方案。对于对代码资产安全和数据出境极其敏感的国内金融、国企、大型互联网企业来说，Comate 是一个合规且安全的选择。它承诺不使用用户代码进行模型训练（需配置）。

### Kilocode:

[kilocode](https://kilo.ai/)
kilocode也是一个完全开源的编程ide，它基本和cline一样，但不同的是它可以通过cli使用，并且能够并行化处理。最重要的是，得益于它的开源，它能够支撑500+自定义模型，对于想要完全控制自己代码和数据的开发者来说，kilocode是一个非常不错的选择。

## IDE 端
在 Vibe Coding 的早期阶段，我们依赖插件（如 GitHub Copilot）挂载在传统的 VS Code 或 JetBrains 上。但很快，开发者和产品经理们遇到了“玻璃天花板”：
{%note info%}
插件的权限受限，很难感知整个项目的上下文；UI 交互受限于宿主，AI 与代码编辑区的割裂感严重；多文件协同修改极其困难。
{%endnote%}
AI 原生 IDE 应运而生。 它们不再是“带着 AI 的编辑器”，而是**“基于 AI 构建的编辑器”**。在这些工具中，AI 是第一公民。它们深度介入了 IDE 的核心机制：文件索引、代码语法树解析、终端交互以及 UI 布局。它们旨在提供一种无缝的、沉浸式的 Vibe Coding 体验，让开发者在“对话”和“编码”之间自由流转，实现真正的人机“心流（Flow）”融合。

### Cursor:

[cursor](https://www.cursor.com/)

如果说 Vibe Coding 领域有一个必须体验的产品，那就是 Cursor。它是类似于github copilot的存在，真正开启了ide端内卷时代。Cursor目前体验打磨最极致、也是被模仿最多的标杆。

核心基座： 基于 VS Code 分叉（Fork）深度改造。这意味着它保留了 VS Code 庞大的插件生态，同时魔改了核心体验。

Vibe Coding 核心体验：

- Copilot++ (Tab 键预测)： Cursor 的代码补全不仅仅是补全一行。它能极其精准地预测你光标想要移动的下一个位置，甚至预测你接下来要进行的复杂的跨行修改。这给人一种“它读懂了我的思绪”的强烈 Vibe。

- Composer ： 这是 Cursor 区别于普通插件的最强功能。它是一个浮动的、可以操控整个项目的 Agent 窗口。你可以告诉它“把这个 React 组件拆分成三个小组件，并更新所有引用”，Composer 会同时打开多个相关文件，在你眼前实时地、并行地进行修改。这种掌控感是革命性的。

- 极致的上下文索引： 你可以随时用 @Codebase、@Files、@Docs 来引用整个项目或外部文档。Cursor 对本地代码库的索引速度极快，使得它的回答非常精准。

{%note success%}
Cursor 是目前完成度最高、也是最贵的（$20/月）商业产品。它成功地将 AI 从“辅助工具”提升到了“协作伙伴”的高度，是专业开发者追求极致效率的首选。
{%endnote%}

### Windsurf:

[windsurf](https://windsurf.dev/)

Windsurf 是由在 AI 代码补全领域深耕多年的 Codeium 团队推出的独立 IDE。它是目前唯一能在体验和技术深度上与 Cursor 正面硬刚的对手。

核心基座： 同样基于 VS Code 深度改造。

Windsurf 的核心哲学是保持开发者的“心流”。它的侧边栏对话与代码编辑区的融合极其顺滑。AI 生成的代码修改会以一种非常直观的 Inline Diff（行内差异对比）形式呈现，开发者可以快速接受或拒绝，思维不被打断。

- Cascade (级联上下文)： Codeium 团队在底层模型和上下文检索方面有深厚积累。Windsurf 强调其对项目上下文理解的深度，声称能比竞争对手更准确地感知复杂的依赖关系。它甚至能感知你最近在 IDE 里看了哪些文件、进行了哪些操作，从而预判你的意图。

- 极速响应： 得益于自研模型和基础设施，Windsurf 的响应速度通常给人感觉非常快。

{%note success%}
Windsurf 是 Cursor 的强力替代品。如果说 Cursor 胜在功能的丰富度（如 Composer），Windsurf 则胜在基础体验的流畅度和对“人机协作心流”的深刻理解。对于不喜欢 Cursor 订阅模式或希望尝试不同交互风格的用户极具吸引力。
{%endnote%}

### Trae:

[trae](trae.ai)

Trae 是字节跳动面向海外市场推出的 AI 原生 IDE（其国内对应版本可能与 MarsCode 有关）。它一经推出就以其强大的功能和激进的策略引起了关注。Trae 几乎复刻了 Cursor 的核心成功要素。它拥有类似于 Composer 的多文件编辑代理能力，以及强大的行内补全和对话功能。

Trae引入注目的一点最主要是因为在推广期，Trae 提供了极其慷慨的免费使用额度，并且可以使用最高级的模型。这对于价格敏感的用户来说是巨大的杀手锏。但是目前来看，它看起来依然没法完全追齐cursor。

{%note success%}
Trae 用大厂的资源和免费策略直接冲击市场。对于希望获得顶级 AI IDE 体验但又不想支付 Cursor 高昂费用的开发者来说，Trae 是目前最佳的“平替”选择。
{%endnote%}

### Antigravity

[Antigravity](https://antigravity.google/)

现在我要隆重介绍的是Antigravity , Google 在 2025 年末刚刚发布的全新开发平台，旨在成为 AI Agent 时代软件开发的大本營。它的推出标志着 Google 正式以第一方姿态杀入 AI IDE 战场。

核心基座： 虽然外观类似 VS Code，但它是一个全新的 "Agent-First"（智能体优先）开发平台，强调 AI 的自主规划和执行能力。它是 Google 之前 Project IDX（基于浏览器的云端开发环境，现已并入 Firebase Studio）理念的进一步演进。


Vibe Coding 核心体验：

- Agent-First 界面： Antigravity 不仅仅是在编辑器旁边加一个聊天窗口。它提供了一个专门的界面来管理、编排和观察多个 AI Agent。这些 Agent 可以跨编辑器、终端和浏览器异步工作。

- 自主规划与执行 (Artifacts)： 当你下达一个复杂任务（如“重构登录模块”）时，Agent 会先生成一个结构化的计划（Plan），然后生成具体的实施步骤（Artifacts），例如代码变更列表、测试用例、甚至是浏览器操作录屏。这种“先规划后执行”的模式极大地提高了复杂任务的成功率和透明度。

- 跨界面协同 (Cross-surface Agents)： Antigravity 的 Agent 可以同时控制 IDE 的编辑器、终端和内置的浏览器。例如，它可以自己打开浏览器查阅最新的 API 文档，然后在终端运行测试，最后修改代码。这种能力非常接近于 Devin 等独立 Agent 产品。

-  云端一体化： 作为 Google 的产品，它天生与 Google Cloud、Firebase 等服务深度集成，非常适合构建和部署云原生应用。

{%note success%}
Antigravity 是 Google 对 Cursor、Windsurf 以及 Devin 等产品的有力回应。它的核心差异点在于**“Agent 优先”的设计理念和强大的云端基础设施支持**。它不仅仅想做一个更好的编辑器，而是想做一个能管理 AI 员工的“指挥中心”。对于已经身处 Google 生态、或者需要进行复杂云原生开发的企业和团队来说，Antigravity 具有巨大的吸引力。目前其预览版提供免费使用 Gemini Pro 3.0 的机会，让它极具竞争力。
{%endnote%}

Antigravity 最近是免费使用的，可以直接使用gemini 3 pro和claude4.5,还是非常香的。

## CLI端

对于普通用户来说，图形界面（GUI）是舒适区；但对于资深开发者、运维工程师（DevOps）和极客来说，黑底白字的终端（Terminal）才是真正的“驾驶舱”。在 Vibe Coding 的语境下，CLI 工具不仅仅是“聊天机器人”，它们是将自然语言直接转化为系统指令的神器。

核心定义：**为什么 CLI 需要 Vibe Coding？**，在终端里，开发者面临的最大痛点是：“我知道我想干什么，但我忘了具体的命令参数是什么。”

> “我想把这个文件夹压缩成 tar.gz 并排除 .git 目录。” “我想查找过去 24 小时内修改过的所有 Python 文件并统计行数。”

以前，你需要去 Google，复制粘贴，小心翼翼地修改参数。 现在，Vibe Coding 让你直接输入自然语言，AI 将其“翻译”为可执行的 Shell 命令。最重要的是和一般的插件侧工具不同，作为终端的vibe coding，意味着你可以并行开启相当多的窗口来进行coding,极大提升了效率。CLI工具是适合那些对项目规划有清晰认知，且需要进行复杂命令操作的开发者。

### Claude Code (Claude CLI)

[Claude Code](https://www.claude.com/product/claude-code),这是 Anthropic 官方推出的工具，它将 Claude 4 Sonnet 强大的推理能力带入了终端。

Vibe Coding 核心体验：

- 自主推理与文件操作： 与 Copilot 不同，Claude CLI 不仅仅是给你建议命令，它能真的帮你干活。

- 场景： “分析当前目录下的报错日志，找到对应的源码文件，并修复这个空指针异常。”

- 行动： Claude CLI 会读取日志 -> 搜索代码 -> 读取文件 -> 分析逻辑 -> 直接修改文件 -> 运行测试。

- 超强逻辑与长思维链： 得益于 Claude 模型在 Coding 领域的统治力，它非常擅长处理复杂的重构任务或理解晦涩的代码逻辑。

- Token 成本感知： 作为一个面向开发者的工具，它通常会在操作前告诉你“这一步操作大约需要消耗多少 Token/钱”，非常贴心。

### Gemini CLI

[Gemini CLI](https://geminicli.com/)

Google 将 Gemini 的能力深度集成到了 gcloud 命令行工具集以及其开发者生态中。

- 无限上下文 (Infinite Context)： 这是 Gemini 区别于所有竞品的杀手锏。Gemini 1.5 Pro 拥有 200 万 (2M) Token 的上下文窗口。

- 场景： “我这里有一个 500MB 的服务器崩溃日志（Log），太大了，别的 AI 吃不下。你帮我读完，告诉我这周三发生了什么异常。”

- 能力： 你可以将整个巨大的代码库、超长的文档手册或者海量日志直接“管道 (Pipe)”进 Gemini CLI，让它进行大海捞针式的分析。

- 多模态输入： 在某些高级实现中，你甚至可以让终端里的 Gemini 分析图片或视频数据（如果通过 API 调用）。


# 总结

对AI的使用也要更上AI能力的增长，在AI完成复杂任务能力越来越强的时代，如果你没有在这个过程中增长，但最后注定是会被抛弃的。我本来只想要搜罗一下介绍这几款产品，但写着写着就发现，实在太难写了，干脆全交给AI写了。这篇文章对我没有任何知识性的收益，不过希望对大家有帮助。之后，我会抛开具体的工具，抽象地来讨论vibe coding 所真正带给我们的东西。