---
title: "FDE 是什么？为什么 AI 时代突然需要这种「懂业务的工程师」"
description: "AI Agent 开始进入真实业务流程后，企业更需要能同时理解现场、产品与代码的人。FDE 的价值，不是交付建议，而是把 AI 项目推到真正可用。"
pubDate: 2026-06-28
tags: ["FDE", "AI进现场", "AI落地"]
draft: false
---
![AI 进入业务现场的抽象示意](/blog/what-is-fde/hero.png)
在最近的一段时间，随着AI Agent开始能解决实际场景的问题，有一类岗位突然火了。

他们不只是坐在办公室写代码，还需要去到客户现场，深入对方的系统、数据、流程、权限、会议和一堆说不清的历史包袱里，真实地把一个新的业务流程运行起来。

这类人现在有个越来越常见的名字：FDE，Forward Deployed Engineer。可以翻译成“前向部署工程师”、“前线部署工程师”，也可以更直白一点叫：懂业务的工程师。

这个岗位其实是想回答一个更贴近实际的问题：

**AI 已经会写代码、会总结文档、会分析数据了，为什么企业里真正跑起来的 AI 项目还是那么少？**

答案可能是：**AI 掌握的数据上下文，还远远不够。**

在很多业务场景，数据并不是规范化的。它可能在 Excel、PDF、旧系统、邮件附件和某个老员工的电脑里。模型跑通只是第一步，后面还有权限管理、集成、评测、合规、上线、监控、培训、组织接受度等一系列问题。

技术的发展路径总是相似，19 世纪末到 20 世纪初，很多工厂开始用电。按理说，电机比蒸汽机灵活得多，不需要一台巨大的中央动力源，也不需要把所有机器都挤在一套轴和皮带周围。但早期工厂并没有立刻重新设计生产系统。

蒸汽时代的工厂，通常是一台大蒸汽机带动一根长长的传动轴，传动轴再通过皮带、滑轮、离合器，把动力分给一排排机器。机器怎么摆，不是按物料流、工人协作、工序效率来摆，而是按“怎么接上这根会转的轴”来摆。

电机来了以后，很多工厂做的第一件事不是重构工厂，而是把蒸汽机拆掉，换上一台大电机。电机继续带动原来的轴，轴继续带动皮带，皮带继续带动织机。

![从蒸汽机到电机的工厂组织方式变化](/blog/what-is-fde/steam-electric.png)

所以技术换了，但组织方式没换，效率是谈不上有多大的增长的，对传统的企业来说，AI就相当于那个新的电机，当前很多企业使用AI的方式，其实还是“蒸汽机模式”。

FDE 就是那个拿着最新的电机技术，来重新组织设计工厂结构的岗位。

## 说了那么多，FDE的职业定位是什么？

**准确地说，FDE 是负责把产品能力带到客户真实场景里，并把现场经验带回产品系统里的工程师。**

![FDE 在产品、工程和客户现场之间工作](/blog/what-is-fde/role.png)
它至少做四件事：

1. 到现场找真问题，而不是只听客户复述需求。
2. 亲自写代码、接系统、调数据、做原型。
3. 把东西推到可用状态，包括评测、安全、权限、监控和上线。
4. 把一次项目里的解法，沉淀成平台能力、组件、模板或产品路线。

![FDE 闭环](/blog/what-is-fde/loop.png)

[Palantir 对这个角色的早期描述](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1)很有代表性。它把 FDSE，也就是 Forward Deployed Software Engineer，称为一种特殊的软件工程师：传统产品工程师往往是“做一个能力，服务很多客户”；FDE 则是“围绕一个客户，组合多种能力”，解决对方眼前最复杂的问题。

## 为什么大模型时代更需要FDE了？

聊 FDE，很难绕开 Palantir。

Palantir 早期服务政府、军队、情报、执法和大型企业客户，面对的不是“装个 SaaS 就能用”的场景，而是高度敏感、复杂、割裂的数据环境。[Nabeel Qureshi 在《Reflections on Palantir》](https://nabeelqu.co/reflections-on-palantir)里讲过一个很朴素的点：Palantir 真正难的事情，不只是算法，而是数据整合。

一位 Palantir 的前员工 [Nabeel Qureshi](https://nabeelqu.co/reflections-on-palantir)在他的博客里提到，Palantir FDE 曾经常被期待每周 3-4 天在客户办公室工作；[Palantir 对 Brian 的采访](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1)也写到，FDSE 会在客户项目、平台改进、代码审查、生产监控和内部沟通之间切换，把现场发现带回平台。

这正是 FDE 和普通实施顾问的区别：顾问常常交付建议。FDE 要交付能跑的东西。FDE 要从现场问题出发，再把现场问题拽回产品路线。

到了大模型时代，Palantir 这套打法突然变得更普遍。

原因很简单：AI 产品特别容易“看起来能用”，但真正接进企业流程时特别容易“用不起来”。

* 站在大模型公司的角度、模型训练的高质量语料、已经差不多消耗殆尽了，而且这部分语料是结构化比较好的、容易获取的那部分，企业中的资料私有属性更强，也更加偏向多模态。当模型需要到真实场景中处理这些数据时，是更容易遇到边角问题的。

* 站在企业的角度，AI进入企业工作流的速度确实也在加快了，[Gartner 在 2023 年预测](https://www.gartner.com/en/newsroom/press-releases/2023-10-11-gartner-says-more-than-80-percent-of-enterprises-will-have-used-generative-ai-apis-or-deployed-generative-ai-enabled-applications-by-2026)，到 2026 年，超过 80% 的企业会使用生成式 AI API、模型，或部署生成式 AI 应用；而 2023 年这个比例还不到 5%。[McKinsey 2024 年《The State of AI》调查](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-early-2024-gen-ai-adoption-spikes-and-starts-to-generate-value)也显示，企业采用 AI 的速度很快：72% 的受访组织已经使用 AI，65% 的受访者表示所在组织在至少一个业务职能中经常使用生成式 AI。

有使用 AI 产品，并不等于能稳定地支持复杂场景的持续运转，研发能力偏弱的中小型公司，如何稳定快速把AI 产品嵌入到自家的业务场景中，其实也是相当头大的问题。

**模型公司缺数据、企业不知道如何用得好，FDE就是作为这中间沟通的桥梁。**

## FDE的几个优势：为什么它适合AI落地？

为什么是FDE这个角色，适合AI在企业中落地？

![FDE 连接工程语言与业务语言](/blog/what-is-fde/advantages.png)

1. FDE 最明显的优势，是快。
    FDE 会有一部分时间在业务现场，在早期高频率的需求沟通阶段更容易发现症状所在。

2. 第二个优势，是它能跨语言。
    工程师说延迟、上下文窗口、RAG、评测集。业务方说转化率、工单量、一次解决率、生产节拍、合规风险。很多项目死在翻译层。FDE 的价值，就是能把两边的话翻成同一件事。

3. 第三个优势，是反馈距离短。
    传统产品团队离客户太远，销售和客户成功又离代码太远。FDE 如果设计得好，可以把现场的一线反馈直接送到产品和研发手里。这个机制在 [OpenAI FDE 岗位说明](https://openai.com/careers/forward-deployed-engineer-%28fde%29-nyc-new-york-city/)、[Palantir 的 FDSE 采访](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1)和 [Salesforce FDE 文章](https://www.salesforce.com/ap/blog/forward-deployed-engineer/)里都能看到。

4. 第四个优势，是它天然逼迫组织关注“上线后的问题”。
    AI 系统最麻烦的地方，不在演示阶段，而在上线之后出现回答漂移、成本失控、延迟变高、用户绕开系统、权限边界被踩、评测集过时。FDE 如果只做 PoC，就失去了意义；它必须关心生产采用、真实指标和持续监控。

## 两个对FDE发展趋势的判断

**FDE 会从个人英雄主义走向平台化。**

早期的FDE需要有极宽的技术栈积累，才能支撑得起在复杂多变的业务环境中选用最适合的技术选型，并辅助完成开发。但近几年coding agent的发展已经在逐渐打破这个束缚了，具体的代码已经不需要人工编写，虽然技术选型还是需要人参与决策，但在AI辅助的前提下也没那么难了，**如何实现**本身成为了一个可以流程化的模块，FDE的培养也可以平台化。

**AI 会改写 FDE 本身。**

低阶配置、脚手架搭建、日志分析、测试样本生成、文档整理，都会越来越多交给 AI。[Palantir AIP](https://aip.palantir.com/) 这类面向企业工作流和权限控制的 AI 平台，已经把“让 agent 在组织系统里调用工具、执行任务、受权限约束”变成了产品方向。

但这不意味着人类 FDE 消失。

恰恰相反，人类 FDE 可以花更多精力在复杂事项判断上：问题值不值得做，决定流程怎么改，设计评测标准，处理组织阻力，定义安全边界，把一次现场经验抽象成产品能力。

## 如果你想成为 FDE，该怎么准备？

**广告警告：这个系列我会继续写。**

我会在博客里系统梳理下面的内容：

* 现场课：解释 FDE、Agent、LLM 等基础概念

* 部署手记：拆解 FDE 需要的技术栈、工具链、架构、集成方式和验收方法

* 案例解剖室：拆解中小企业 AI 部署案例
　　　
* 找个懂行的：收集 FDE 视角和企业视角的经验分享

* 情报雷达：收集相关的高质量信息源、行业趋势、工具更新、案例线索

我是相信，AI 有它更大的应用价值，这个价值是在帮助千万家企业实现自动化的过程中实现的。这在目前来说还是蓝海市场，FDE 这个岗位会有强劲的增长趋势。

## 参考材料

- Palantir: [A Day in the Life of a Palantir Forward Deployed Software Engineer](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1)
- Nabeel Qureshi: [Reflections on Palantir](https://nabeelqu.co/reflections-on-palantir)
- The Pragmatic Engineer: [What are Forward Deployed Engineers, and why are they so in demand?](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)
- OpenAI: [Forward Deployed Engineer (FDE) - NYC](https://openai.com/careers/forward-deployed-engineer-%28fde%29-nyc-new-york-city/)、[FDE 职位搜索页](https://openai.com/careers/search/?q=forward+deployed+engineer) 与 [Agents SDK Documentation](https://platform.openai.com/docs/guides/agents)
- Anthropic: [Claude Partner Network](https://www.anthropic.com/news/claude-partner-network) 与 [Anthropic-Accenture partnership](https://www.anthropic.com/news/anthropic-accenture-partnership)
- Salesforce: [What is a Forward Deployed Engineer?](https://www.salesforce.com/ap/blog/forward-deployed-engineer/)
- Gartner: [More Than 80% of Enterprises Will Have Used Generative AI APIs or Deployed Generative AI-Enabled Applications by 2026](https://www.gartner.com/en/newsroom/press-releases/2023-10-11-gartner-says-more-than-80-percent-of-enterprises-will-have-used-generative-ai-apis-or-deployed-generative-ai-enabled-applications-by-2026)
- McKinsey: [The state of AI in early 2024](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-early-2024-gen-ai-adoption-spikes-and-starts-to-generate-value) 与 [The state of AI: How organizations are rewiring to capture value](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value)
- ServiceNow: [ServiceNow and Accenture launch forward deployed engineering program](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-and-Accenture-launch-forward-deployed-engineering-program-to-scale-agentic-AI-across-the-enterprise/default.aspx)
- Accenture: [Reinvention Deployed Engineering](https://www.accenture.com/us-en/services/cloud/application-transformation/reinvention-deployed-engineering/)
- Google Cloud: [Agent Builder](https://cloud.google.com/products/agent-builder)
- Databricks: [MLflow](https://mlflow.org/)
- Microsoft: [Azure AI Foundry](https://azure.microsoft.com/en-us/products/ai-foundry/)
- AWS: [Guardrails for Amazon Bedrock](https://aws.amazon.com/bedrock/guardrails/)
- LangChain: [LangSmith](https://www.langchain.com/langsmith/)
- Arize: [Arize](https://arize.com)
- Weights & Biases: [Weave](https://wandb.ai/site/weave/)
- Palantir: [AIP](https://aip.palantir.com/)
