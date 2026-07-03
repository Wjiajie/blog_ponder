---
title: "今日热点信息速递 · 2026-07-03"
description: "FDE 行业发展优先，覆盖 Feed、AI 工具 / agent、LLM 理论、具身智能，以及思维模型、家庭教育、投资管理。"
pubDate: 2026-07-03
tags: ["热点", "AI", "日报", "FDE", "信息源"]
draft: false
---

# 🔥 热点信息速递 — 2026-07-03

> FDE 行业发展优先；其余覆盖 Feed、AI 工具 / agent、LLM 理论、具身智能与软技能主题。

---

## FDE 行业发展

1. **OpenAI 把 FDE 组织单独公司化，部署从“售前能力”升级成独立经营单元**
   2026-05-11，OpenAI 发布 OpenAI Deployment Company，核心动作不是再招一批解决方案工程师，而是把前线部署能力单独做成多数股权仍由 OpenAI 控制的业务单元，并从 Tomoro 一次性带入约 150 名有实战经验的 FDE 与 Deployment Specialists。这个动作说明头部模型公司已经不再把“模型上线”看作交付尾声，而是把流程重做、工具接入、业务改写和变更管理一起打包成正经产品。
   原文链接：https://openai.com/index/openai-launches-the-deployment-company/

2. **AWS 也押注驻场式交付，FDE 开始从“Palantir 风格”走向云厂商标配**
   2026-06-30，AWS 宣布向新的 Forward Deployed Engineering 组织投入 10 亿美元，目标是把数千名工程师直接嵌入客户现场，用更短周期把 agentic AI 从样板间推进到生产。和传统咨询不同，它强调的是在客户真实约束下共建、交付后可自运维，而不是把依赖长期留在服务商身上。这个信号很重要：FDE 已经不只是 AI 创业公司的差异化打法，开始变成基础设施厂商争抢的交付层。
   原文链接：https://www.aboutamazon.com/news/aws/aws-1-billion-forward-deployed-ai-engineers

3. **Aaron Levie 把企业 AI 落地的难点讲得很直白：问题不是模型不够强，而是工作流还没准备好**
   Box CEO Aaron Levie 在 2026-07-03 的帖子里把企业 Agent 落地需要补的坑说得非常具体：脏数据、老旧系统、评测体系、变更管理、人机协作边界、以及新的组织知识产权结构。核心判断是，企业真正缺的不是再多一个聊天入口，而是有人把这些摩擦逐个拆开，所以 FDE 会成为未来几年最关键的岗位之一。
   原文链接：https://x.com/levie/status/2072875685811716182

4. **Anthropic 内部已经把“部署”做成组织级扩散，而不是工程团队的小范围试点**
   Cat Wu 在 2026-07-02 提到，Claude Tag 已经扩展到工程、产品、数据、销售和市场等团队，内部版本已经落在 65% 的产品 PR 上。这个数字的意义不在“写了多少代码”，而在于企业内部已经出现类似 internal FDE 的角色和方法论：先让工具进入安全边界，再把最佳实践扩散到不同职能。
   原文链接：https://x.com/_catwu/status/2072731500928508331

5. **市场对 FDE 的需求还在继续升温，社区讨论已经从“这是什么岗位”变成“谁在培养这类人”**
   Suraj Sharma 在 2026-06-16 的帖子里提到，a16z 已经推出面向企业 AI 部署人才的 fellowship，点名需要能把 AI 系统真正推到生产的人。虽然这条不是当天发布，但它仍然是本周 FDE 招聘与培养话题里被反复引用的代表材料：岗位定义正在从“能写模型接口的人”变成“能把组织、流程、系统和客户结果一起拉通的人”。
   原文链接：https://x.com/suraj_sharma14/status/2066876195493601369

## Feed 数据源

### 🐦 Builder 推文精选

1. **Thibault Sottiaux 先放风 GPT-5.6 Sol Ultra，说明新一轮高难 prompt 压测已经在开发者圈预热**
   这条动态本身不长，但价值很高：它不是泛泛宣传，而是在提醒开发者把最难的 prompt 提前整理出来。换句话说，模型代际切换正在把“随便试试”推向“系统化基准集管理”。
   - 🔗 https://x.com/thsottiaux/status/2072607914217320644 · ❤️ 9610 · 🔄 388

2. **Claude 与 Gladstone Institute 发起 life sciences 黑客松，AI 编程开始往高门槛科研场景推进**
   真正值得看的不是奖金池，而是它把 Claude Science 与 Claude Code 一起放进了生命科学研究流程里。研究型组织越来越需要能把论文、实验、代码和协作流程一起打通的工具链。
   - 🔗 https://x.com/claudeai/status/2072681853971001849 · ❤️ 4558 · 🔄 445

3. **Cat Wu 继续补充 Claude Tag 内部 rollout 细节，重点不是功能，而是全组织渗透**
   她提到 Tag 已经覆盖工程、产品、数据、销售和市场，意味着 AI 编程代理不再只是工程师个人效率工具，而是在往组织操作系统的方向走。这个趋势和 FDE 主题能直接对上：企业开始需要一套能跨团队复制的部署剧本。
   - 🔗 https://x.com/_catwu/status/2072731500928508331 · ❤️ 483 · 🔄 27

4. **Guillermo Rauch 公开解释 AI Gateway Rules，焦点是“模型退役后怎样不停机切流”**
   它把一个经常被忽略的问题说透了：模型生命周期变化太快，生产系统不能每次都靠人工紧急换模型。AI Gateway Rules 的价值，在于把模型重写、拦截和切流从“故障时临时救火”前置成标准能力。
   - 🔗 https://x.com/rauchg/status/2072741369848746315 · ❤️ 234 · 🔄 14

5. **Zara Zhang 记录学生用 AI 替代听课的现象，教育内容消费正在被“先让 AI 教我”重写**
   这不是简单的效率技巧，而是学习入口发生了变化。学生先把课件扔给 AI 再决定要不要看老师讲课，意味着课程本身必须提供更高密度、更难替代的价值。
   - 🔗 https://x.com/zarazhangrui/status/2072729444943577601 · ❤️ 254 · 🔄 8

6. **Aaron Levie 再次强调企业 AI 部署比聊天复杂得多，和今天的 FDE 主线高度一致**
   他把数据治理、遗留系统、人机协作设计、评测和变更管理都拉出来单讲，基本是在告诉市场：真正值钱的环节不是“把模型接上”，而是“把组织调通”。
   - 🔗 https://x.com/levie/status/2072875685811716182 · ❤️ 151 · 🔄 13

### 🎙️ Podcast 深度摘要

1. **No Priors —「How Nuclear Will Unlock Energy Abundance with Valar Atomics Founder Isaiah Taylor」**

   **核心观点**：这期节目把“AI 算力焦虑”往上游推了一层，真正卡住未来产业扩张的不是模型本身，而是电力供给、建造速度和可规模化的硬件制造方式。

   **关键洞察**：
   - 嘉宾把核能创业的重点从“更复杂的理论设计”转回“更快的硬件迭代”，认为美国核工业过去几十年过度依赖建模和模拟，缺的是制造与交付速度。
   - 对 AI 行业来说，电力不再只是背景资源，而是决定训练、推理和新型工业系统能不能扩张的硬约束。
   - 这家公司强调“制造出来的反应堆”而不是“现场搭出来的工程项目”，背后是典型的 scale thesis：只有把核能做成接近工业品，才可能把成本继续压低。
   - 节目里还反复提到监管窗口正在重新打开，说明未来几年能源基础设施可能会跟 AI 一样进入快节奏试错期。

   > “If you can figure out how to make energy cheaper, you will have demand.”
   > 中文释义：只要你真能把电做便宜，需求不会成为问题。

   🔗 https://www.youtube.com/watch?v=5Xvbq_zvOQ4

## AI 工具 / agent

1. **面向 Web 开发者的 Safari MCP 服务器**
   时间：2026-07-03 17:59
   分类：产品发布 / agent 基础设施
   Safari Technology Preview 247 推出 Safari MCP 服务器，直接把浏览器窗口暴露给 MCP 客户端。对开发者来说，最关键的不是“又多了一个浏览器工具”，而是 DOM、网络请求、截图、控制台这些原本分散在 DevTools 里的上下文开始能被同一个 agent 连起来调用，调试链路会更短。
   原文链接：https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers

2. **Cursor 上线 Remote Control，把本地 agent 真正变成“离座可继续工作”的模式**
   时间：2026-07-03 19:49
   分类：产品发布 / agent 工作流
   这次不是简单做一个移动端壳，而是允许用户在手机上接管自己机器上的 agent 任务，终端、文件编辑、测试、git 操作仍然发生在原始本地环境里。意义在于，很多开发者终于可以把 AI 自动化留在真实仓库和真实服务里跑，而不是只能在云端示范环境里看 demo。
   原文链接：https://x.com/ericzakariasson/status/2073011248254320989

3. **Browser Use CLI 3.0 把浏览器 agent 再往“轻量、可嵌入、可复用”推了一步**
   时间：2026-07-03 18:17
   分类：产品发布 / agent 工具链
   这一版的重点不是多几个 helper，而是改成直接走 CDP、减少 DOM 全量塞上下文、支持沉淀 domain skills，并且缺函数时可即时生成执行。它更像是在把浏览器操作从“脚本堆栈”重构成“可积累的 agent 基础设施”。
   原文链接：https://x.com/xiaohu/status/2072987979979837620

4. **ForgeTrain 把“AI 写训练框架”从玩具推进到生产级基座**
   时间：2026-07-03 17:12
   分类：产品发布 / 训练工程
   面壁智能发布的 ForgeTrain 最有价值的地方，不是“无人类干预”这个标题，而是它拿出了和 Megatron-LM 对打的效率结果，还能跨模型、跨硬件迁移。训练工程这件事正在出现新的分工：人负责定义目标和验证，AI 负责把具体代码锻造到适配当前硬件与模型。
   原文链接：https://mp.weixin.qq.com/s/JVBbqU1O967ktzfEPuDERQ

5. **Page Agent 证明“页内 DOM agent”正在成为自有应用内嵌副驾的现实路线**
   时间：2026-07-03 04:51
   分类：产品发布 / 前端 agent
   阿里巴巴的 Page Agent 走的是另一条路：不靠截图和外部浏览器，而是把页面 DOM 压成可供文本模型理解的结构，再让模型在站内完成点击、填写和操作。适合想把 AI 直接塞进产品内部流程的团队，尤其是做表单、后台系统和内部工具的场景。
   原文链接：https://www.marktechpost.com/2026/07/02/meet-alibabas-page-agent-a-javascript-in-page-gui-agent-that-controls-web-interfaces-with-natural-language-through-the-dom

6. **Claude Enterprise 把“看用量、控预算、解释价值”补到了管理后台**
   时间：2026-07-03 02:03
   分类：产品发布 / 企业管理
   企业买 AI 到了今年，最怕的不是没有模型，而是不知道哪些团队真的在用、花了多少钱、值不值得继续扩。Anthropic 这次补的是管理员最在意的东西：群组级用量、成本归因、自然语言分析、预算预警、审批能力。这说明企业 AI 采购已经进入精细化经营阶段。
   原文链接：https://claude.com/blog/giving-admins-more-visibility-and-control-over-claude-usage-and-spend

7. **SGLang 团队把 agent-assisted development 讲得更像工程体系，而不是一次实验**
   时间：2026-07-03 02:37
   分类：技巧与观点
   这篇文章有意思的地方，在于它没有把 agent 当成“更聪明的补全”，而是把技能文件、脚本、基准、审查和再验证拼成一个持续优化循环。性能工作、review 标准、问题定义都被纳入 skill 化流程，说明高强度 infra 团队已经开始把 agent 当成一套流程机器来驯化。
   原文链接：https://www.lmsys.org/blog/2026-07-02-agent-assisted-sglang-development

8. **Meta 自己也承认：Agent 这件事还没有快到管理层之前想象的速度**
   时间：2026-07-03 07:38
   分类：行业动态
   这条并不是唱衰 agent，而是在提醒市场回到现实：即便砸了大量基础设施和组织重组预算，真正把 agent 变成稳定生产力仍然很难。它和今天 FDE 线索能拼起来看：模型能力继续提升，但交付、治理和组织吸收速度没有同步跟上。
   原文链接：https://techcrunch.com/2026/07/02/mark-zuckerberg-tells-staff-that-ai-agents-havent-progressed-as-quickly-as-hed-hoped

## LLM 理论

1. **Program-as-Weights: A Programming Paradigm for Fuzzy Functions**
   来源：HuggingFace Papers / arXiv
   这篇论文想解决的是一类“很难写成规则，但又不值得每次都调大模型 API”的任务，比如修坏 JSON、筛日志、按意图排序。作者提出 Program-as-Weights：把自然语言规格编译成一个可本地执行的小型神经工件。实验里，0.6B 的 Qwen3 解释器加上编译出的 adapter，效果接近直接提示 32B 模型，但推理内存只要大约五十分之一，还能在 MacBook M3 上本地跑到 30 tokens/s。对本地 agent 和边缘部署非常有启发。
   原文链接：https://huggingface.co/papers/2607.02512

2. **AgenticSTS: A Bounded-Memory Testbed for Long-Horizon LLM Agents**
   来源：HuggingFace Papers / arXiv
   这篇工作盯着长时程 agent 最难的老问题之一：记忆到底该怎么组织。作者不用“把历史全拼进 prompt”的累积式方法，而是做了一个有边界的 typed retrieval contract，让每一步决策都从新的用户消息中取回需要的记忆层。测试环境选在 Slay the Spire 2 这类要做数百次策略决策的游戏里，结果显示启用 strategic skills 后赢率从 3/10 提到 6/10。它更像一篇 agent memory 设计论文，而不只是 benchmark。
   原文链接：https://huggingface.co/papers/2607.02255

3. **AgenticDataBench: A Comprehensive Benchmark for Data Agents**
   来源：HuggingFace Papers / arXiv
   数据 agent 现在很热，但很多评估仍然停留在小样本 demo。AgenticDataBench 想做的是更像真实世界的 benchmark：覆盖 15 个垂直领域，带细粒度 ground truth，还加入 5 个真实金融科技 B2B 任务。作者还从 Stack Overflow 解法里抽 recurring data skills，把 benchmark 覆盖范围量化出来。对做数据分析助手、BI copilot、自动建模 agent 的团队来说，这种 benchmark 会比单条 SQL 或单个 notebook 任务更接近生产。
   原文链接：https://huggingface.co/papers/2607.01647

4. **WorldDirector: Building Controllable World Simulators with Persistent Dynamic Memory**
   来源：HuggingFace Papers / arXiv
   这篇更偏世界模型，但和 agent 也有关。它把“语义运动编排”和“视觉生成”拆开：先让 LLM 协调 3D 轨迹和镜头运动，再把这些轨迹当控制信号去生成视频。好处是动态对象即使长时间离开画面，回来时也能保持身份一致，适合需要长时序、强可控性的模拟环境。
   原文链接：https://huggingface.co/papers/2607.02517

5. **Optimizing Visual Generative Models via Distribution-wise Rewards**
   来源：HuggingFace Papers / arXiv
   论文针对的是视觉生成里的 reward hacking：如果每张图单独拿 reward 优化，很容易把多样性做没。作者改成 distribution-wise rewards，从整个样本分布层面给奖励，并设计 subset-replace 策略降低计算成本。结果是在多个 base model 上把 FID-50K 拉下来，同时保持样本多样性。对后训练图像模型和视频模型的人来说，这个思路比“继续调单样本奖励”更值得看。
   原文链接：https://huggingface.co/papers/2607.02291

## 具身智能

1. **UBTECH 发布 UWORLD U1，量产口径第一次喊到“全尺寸超仿生 humanoid”**
   2026-07-02 的动态里，UBTECH 把 U1 定位成全球首个全尺寸量产级 ultra-bionic humanoid。重要的不只是概念词，而是“mass-produced”这件事：具身智能叙事正在从研究样机往供应链、成本和交付节奏转。
   原文链接：https://x.com/UBTECHRobotics/status/2072651508710285419

2. **Figure 03 把目标直接对准家庭场景，时间表压到 2026 年底**
   Brett Adcock 这条相关讨论被二次传播得很快，原因是他给了一个激进但明确的目标：让机器人在家里完成真正有用的任务。市场会继续怀疑时间表能不能兑现，但“先从工厂再到家庭”的路线已经写得非常清楚。
   原文链接：https://x.com/spaceandtech_/status/2072709239760642112

3. **BMW Plant Spartanburg 的部署案例继续被拿来当 humanoid 落地样板**
   Advanced humanoid forum 总结的亮点是：部署逻辑正在从孤立工位自动化转向更灵活的人机混合流程。真正被反复讨论的不是机器人有没有手，而是它能否在已有工厂节拍里承担运输、搬运和协作任务。
   原文链接：https://x.com/CobotUli/status/2072930337466810386

4. **日本团队做出可充气软体 humanoid，安全和成本可能会成为另一条具身路线**
   这类产品和主流“金属骨架 humanoid”不是一条路线，但它提醒人们：具身智能未必都要走高刚性、高功率密度方案。可折叠、轻量、低风险的人机交互机器人，在医疗、陪护、教育和家庭场景里反而可能更早找到位置。
   原文链接：https://x.com/spaceandtech_/status/2072367379519246511

## 思维模型

1. **YouTube：The Latticework of Mental Models For a Great Life!**
   来源：YouTube / SXSW
   这场分享继续把 Charlie Munger 那套 latticework 思路往生活决策里搬。它不是教你背概念表，而是强调把信任、复利、反向思考、借鉴成熟模式这些模型串成网，用在职业判断、合作关系和长期选择上。
   备注：字幕不可用，仅保留 YouTube 页面简介。
   原文链接：https://www.youtube.com/watch?v=Z2J_8GHcrvQ

2. **Reddit：What’s your weirdest productivity trick that actually works?**
   来源：r/productivity
   这条本周热帖有意思的地方，是大家提供的不是宏大理论，而是极具体、很容易立刻试的“触发器”动作，比如先穿上运动服、先摆出工作姿态、先做一个很小的启动动作。它再次说明，很多效率问题不是不知道方法，而是缺启动摩擦最小的那一步。
   原文链接：https://www.reddit.com/r/productivity/comments/1uhyx2o/whats_your_weirdest_productivity_trick_that/

3. **Reddit：How do you keep parts of your life in “maintenance mode”?**
   来源：r/productivity
   这条讨论特别适合最近任务很多、又不想把生活全面压扁的人。高赞回应强调两点：提前决定哪些维度允许降级，不要在崩溃当下再做判断；以及把标准从“维持理想状态”调到“不要完全断线”。这比空喊平衡更实用。
   原文链接：https://www.reddit.com/r/productivity/comments/1uhq4iv/how_do_you_keep_parts_of_your_life_in_maintenance/

4. **Reddit：How I Realized I Was Collecting Knowledge Instead of Actually Learning**
   来源：r/productivity
   这条帖子点破了一个很常见的错觉：收藏、摘录、囤链接会制造一种“我在进步”的感觉，但如果信息没有被转成行动、复述或具体应用，知识库只会越堆越像纪念馆。作者给出的规则很简单：每保存一条内容，就立刻做一个小动作。
   原文链接：https://www.reddit.com/r/productivity/comments/1uk7adw/how_i_realized_i_was_collecting_knowledge_instead/

5. **即刻补充源今日未形成有效条目**
   今日即刻搜索页可打开，但返回的是站点壳层页面，未稳定吐出“思维模型”相关正文内容，因此这一板块没有纳入即刻帖子，避免用空壳链接充数。

## 家庭教育

1. **YouTube：The Science of Parenting: Translating the Latest Research for Parents**
   来源：YouTube
   这类内容的价值在于把研究语言翻译成家长真正能用的判断标准：哪些常见育儿说法只是经验口号，哪些建议背后有比较稳的研究支撑。虽然这条视频今天没能顺利拿到字幕，但从简介看，它仍然聚焦“把最新研究翻成可执行建议”这件事。
   备注：字幕不可用，仅保留 YouTube 页面简介。
   原文链接：https://www.youtube.com/watch?v=kMbpn4rHyRg

2. **Reddit：How important is it to anchor furniture during toddler years?**
   来源：r/ScienceBasedParenting
   这周这条讨论问得很直接：孩子开始走路后，家里高柜、斗柜、独立柜体到底要不要全部固定。高赞回复给出的方向比较一致：真实风险来自低概率高后果事件，尤其当家具一旦倾倒就可能造成致命伤时，“太重所以不会倒”的直觉并不可靠。
   原文链接：https://www.reddit.com/r/ScienceBasedParenting/comments/1uinlrl/how_important_is_it_to_anchor_furniture_during/

3. **Reddit：Is there good quality evidence that children born via elective C-section experience any long-term health risks?**
   来源：r/ScienceBasedParenting
   这条帖子的价值不是替某种分娩方式站队，而是把研究里最常见的偏差说清楚：很多 C-section 研究混在一起看了“计划内”“必要性”“紧急性”几类截然不同的场景，所以结论很容易被选择偏差污染。高质量回复里提到的几篇论文总体给出的信息更克制：哮喘风险可能有差异，但很多长期健康指标并没有稳定证据指向决定性差别。
   原文链接：https://www.reddit.com/r/ScienceBasedParenting/comments/1ui7ib7/is_there_good_quality_evidence_that_children_born/

4. **即刻补充源今日未形成有效条目**
   即刻页面今日能打开帐号壳层，但搜索结果正文没有稳定返回，因此没有把“家庭教育”板块硬塞进无内容链接。

## 投资管理

1. **YouTube：Howard Marks: 78 Years of Investing Wisdom in 60 Minutes**
   来源：YouTube
   这条视频一直有人看，不是偶然。市场再热闹，真正经得起反复看的还是周期、赔率、风险承担和预期管理这些老问题。页面简介里最重要的一层，是 Howard Marks 依旧把“认清自己不知道什么”和“在市场狂热时保留节制”放在首位。
   备注：字幕不可用，仅保留 YouTube 页面简介。
   原文链接：https://www.youtube.com/watch?v=V44vd4sJcPs

2. **Reddit：Financial advisor puts seven figure egg on my face (staying the course, reluctantly)**
   来源：r/Bogleheads
   这条帖子之所以热，不是因为作者改口支持顾问，而是它把指数投资者最难受的一刻写出来了：当身边有人靠单一股票意外暴赚，你手里的三基金组合会显得非常平庸。评论区的主旋律依旧是“不要用幸存者样本改写自己的长期纪律”，这比口头上的 stay the course 更接近真实心理战。
   原文链接：https://www.reddit.com/r/Bogleheads/comments/1ugshs8/financial_advisor_puts_seven_figure_egg_on_my/

3. **Reddit：You're happy being a Boglehead but your spouse thinks adding Real Estate is a good idea**
   来源：r/Bogleheads
   这条讨论对应的是很多家庭真实会遇到的配置分歧：一方偏向继续持有宽基，另一方觉得阶段性现金该拿去买出租房。它的价值不在于替房地产或指数基金判输赢，而是提醒配置争论常常不是收益率争论，而是流动性、精力投入、家庭协同和风险承受方式的争论。
   原文链接：https://www.reddit.com/r/Bogleheads/comments/1uhlesm/youre_happy_being_a_boglehead_but_your_spouse/

4. **Reddit：A Simple Reminder for Building Wealth for New Investors**
   来源：r/Bogleheads
   这条短文很像给新投资者打的一针镇静剂。作者观察到，很多人并不是输在不知道买什么，而是把太多时间耗在券商选择、仓位微调、市场噪音和细枝末节上。真正可复利的，是判断力、时间分配和把精力投到职业成长上。
   原文链接：https://www.reddit.com/r/Bogleheads/comments/1uknbuy/a_simple_reminder_for_building_wealth_for_new/

5. **即刻补充源今日未形成有效条目**
   今日即刻搜索“投资管理”只返回站点壳层，没有稳定拉出帖子正文，因此没有把即刻内容写进正式条目。

## 关注账号动态

1. **AK (@_akhaliq)**
   最新能稳定抓到的是一条对 Hugging Face 论文页的转发 / 回复，内容指向 *PerceptionRubrics: Calibrating Multimodal Evaluation to Human Perception*。这说明 AK 仍然延续“把新论文快速送进开发者视野”的老角色，对论文追踪用户依然有参考价值。
   原文链接：https://x.com/_akhaliq/status/2072839410144428041

2. **其余关注账号今日未能稳定提取到正文卡片**
   已尝试账号主页与 `from:账号` 的 live 搜索两条路径，但 X 搜索页今天对 Karpathy、Ethan Mollick、Jim Fan、Brett Adcock、OpenAI、Anthropic、Dify、n8n 等账号都没有稳定返回可读 article 节点，因此不硬写空内容。账号名单保留如下，等待下轮继续追踪：Andrej Karpathy、Ethan Mollick、McKay Wrigley、Jim Fan、Brett Adcock、Charlie Bilello、George Mack、Emily Oster、Adam Grant、Palantir、OpenAI、Anthropic、Dify、n8n。
