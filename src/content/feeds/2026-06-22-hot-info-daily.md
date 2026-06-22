---
title: "今日热点信息速递 · 2026-06-22"
description: "AI 工具 / LLM 理论 / 具身智能 + 软技能类（思维模型/家庭教育/投资管理）+ FDE 行业发展 + 15 个关注账号。本轮为 skill 改动验证性抓取（test run），未跑 ego-browser 路径，软技能主题在报告内显式标为'本轮测试未抓取'。来源：AI HOT API + Follow Builders Feed + Follow Builders Podcast。"
pubDate: 2026-06-22
tags: ["热点", "AI", "日报", "信息源"]
draft: false
---

# 🔥 热点信息速递 — 2026-06-22

> 生成工具：Hot Info Crawler（test run）| 开始时间：23:50
> 覆盖板块：AI Builders Feed · AI 工具/agent · LLM 理论 · 具身智能 · 思维模型 · 家庭教育 · 投资管理 · FDE 行业发展 · 关注账号
>
> **本轮测试范围说明**：本次为 hot-info-crawler skill 改动（中文优先字段级规则 + 摘要完整不截断 + humanizer 责任边界 + 清理 task space 硬约束）后的第一次验证性抓取。为控制 round trip 与 token 消耗，本轮只跑 API/JSON 可达的数据源（AI HOT API + Follow Builders Feed + Follow Builders Podcast），**未跑 ego-browser 抓取**——5 个软技能/具身智能主题在报告内显式标"本轮测试未抓取 + 下次抓取建议"。Follow Builders Feed 缓存于 2026-06-22 08:29 UTC。

---

# 🔥 AI Builders 动态速递

> 数据来源：[Follow Builders](https://github.com/zarazhangrui/follow-builders) 中央 Feed | 更新时间：2026-06-22T08:29:37.749Z | 覆盖范围：24h

## 🐦 Builder 推文精选

> 按总互动量（❤️ + 🔄×2）降序排列，每个 Builder 独立小节。推文按个人热度降序。

### Thibault Sottiaux — @thsottiaux
> *Codex & ChatGPT @OpenAI*

围绕 Codex App 用户体验征求反馈：询问用户对 usage reset（用量重置）机制的偏好（囤积 vs 即用即用），并征集 Codex App 中"不够好"的地方，希望社区共同把体验打磨到位。

- 🔗 [t.co/pBWhE53c4A](https://x.com/thsottiaux/status/2068792061265121316) · ❤️ 2066 · 🔄 67
- 🔗 [Now that you can bank usage resets in Codex. Are you a hoarder or do you use them without breaking a sweat? How do you think about them?](https://x.com/thsottiaux/status/2068792010715324444) · ❤️ 2237 · 🔄 27
- 🔗 [What should we improve in the Codex app. What's not delightful?](https://x.com/thsottiaux/status/2068736857312198928) · ❤️ 2581 · 🔄 57

### Guillermo Rauch — @rauchg
> *@vercel CEO*

Vercel 持续打磨 Simba 等产品：团队对 WebGPU shader、布局、绘制全链路做性能优化；同时分享一个观点——"coding agent 会从你身上榨取每一滴 IKEA effect（自己动手搭起来才觉得有价值的心理效应）"。父亲节发文感谢父亲当年倾尽所有为家庭买下"心灵之车"（计算机）。

- 🔗 [The team cooked on Simba performance...](https://x.com/rauchg/status/2068838709517336756) · ❤️ 791 · 🔄 20
- 🔗 [Coding agents will squeeze every ounce of IKEA effect out of you, if you let them.](https://x.com/rauchg/status/2068778558672273422) · ❤️ 1335 · 🔄 37
- 🔗 [Happy Father's Day...](https://x.com/rauchg/status/2068732939559727468) · ❤️ 1034 · 🔄 34

### Garry Tan — @garrytan
> *President & CEO @ycombinator —Founder @garryslist—Creator of GStack & GBrain—designer/engineer who helps founders—SF Dem accelerating the boom loop*

回顾开源 GBrain 的初心：在 2026 年"拥有自己的个人/公司级 brain"是被低估的护城河。GBrain 把这套 personal brain + company brain 的范式作为可复用的能力提供给社区。

- 🔗 [This is why I made GBrain and open sourced it](https://x.com/garrytan/status/2068701357696323769) · ❤️ 88 · 🔄 5
- 🔗 [I think one underestimated thing... personal brain and company brain in 2026](https://x.com/garrytan/status/2068701356358308112) · ❤️ 964 · 🔄 66

### Peter Steinberger — @steipete
> *Polyagentmorous ClawFather. Came back from retirement to mess with AI and help a lobster take over the world. @OpenClaw🦞 + @OpenAI*

OpenClaw 团队更新：在 hype 退潮后他们选择把精力放在质量打磨上，并扩展团队，创立非营利组织持续推进。个人对"多模型路由"曾持怀疑态度，事后看直觉是对的。

- 🔗 [This is becoming my favorite way to read Twitter.](https://x.com/steipete/status/2068965200343224367) · ❤️ 336 · 🔄 20
- 🔗 [People here discussing what happened with OpenClaw. The hype died down. We improved quality and grew a team.](https://x.com/steipete/status/2068961217524490739) · ❤️ 273 · 🔄 15
- 🔗 [I was skeptical about the multi-model routing. Seems my hinch was right.](https://x.com/steipete/status/2068960117253632160) · ❤️ 136 · 🔄 4

### Aaron Levie — @levie
> *ceo @box - your business lives in content. unleash it with AI*

点评 Sakana Fugu：用 mixture of models 完成"模型路由"是把 AI 架构往前推的另一种思路；同时提醒——agent 接管软件后，100x 的软件调用意味着对 guardrail、真相源、日志审计的依赖会陡增。

- 🔗 [Another new idea... Sakana released a model that effectively uses a mixture of models](https://x.com/levie/status/2068917230570795178) · ❤️ 206 · 🔄 23
- 🔗 [Agents will use software 100X more than people. There's a huge need for guardrails...](https://x.com/levie/status/2068851573175021864) · ❤️ 228 · 🔄 44

### Ryo Lu — @ryolu_
> *Design @Cursor_ai. Early @NotionHQ, @Stripe, built startups.*

在 ryOS 里做了 Books 应用：想看实体书架的感觉但家里缺木质书架，所以从 Cursor 移动端起步做出可同步进度的 EPUB 阅读器。跨设备同步 + 手工调动画与材质，"把书放在自己做的世界里"。

- 🔗 [works with any epub syncs progress with ryOS account](https://x.com/ryolu_/status/2068924375341179347) · ❤️ 13 · 🔄 0
- 🔗 [missing wooden shelves so i made Books in ryOS...](https://x.com/ryolu_/status/2068923971136098633) · ❤️ 324 · 🔄 5

### Nikunj Kothari — @nikunj
> *partner @fpvventures - investing in seed/A. previous: early hire @meter, @opendoor, @atlassian & others.*

日常：父亲节感慨、每周在 X 上"看到一个有趣项目 → fork → 给创始人 DM"的发现流。属于风投合伙人的工作切片式分享。

- 🔗 [How your email finds me today.. Happy Father's Day...](https://x.com/nikunj/status/2068740575130689554) · ❤️ 57 · 🔄 0
- 🔗 [Happens every week 🙈 see an interesting project on X...](https://x.com/nikunj/status/2068714024934740476) · ❤️ 92 · 🔄 0

### Zara Zhang — @zarazhangrui
> *Builder. Dangerously skips permissions. Harvard'17.*

反对 AI slop 的实用经验法则：输入（context）长度应明显长于输出长度。作者经验值是 3-5 倍的输入才能拿到质量稳定的结果；输入远短于输出几乎一定是低质。

- 🔗 [A good rule of thumb for preventing AI slop: Is your input longer than the output?...](https://x.com/zarazhangrui/status/2068923768500793603) · ❤️ 131 · 🔄 4

### Peter Yang — @petergyang
> *Practical AI tutorials and interviews for busy people | Join 150K+ readers at t.co/XYKTmGVH14*

个人：作为移民后代对"省资源"形成的稀缺心态，但迁移到无限 token 上仍需刻意调整。推荐朋友 Kevin 的 @ferrymanio：跨平台一键同步到 7+ 平台。同时转发 @liu8in 关于"用 HTML 作为 agentic video 基础"的长文，论证为什么 agent 做视频最终回到代码路径——HTML 是 LLM 的母语。

- 🔗 [It's funny, growing up as an immigrant I developed a scarcity mindset...](https://x.com/petergyang/status/2068874249167884544) · ❤️ 25 · 🔄 0
- 🔗 [Check out my friend Kevin's awesome tool @ferrymanio...](https://x.com/petergyang/status/2068854663534031124) · ❤️ 12 · 🔄 0
- 🔗 [Why HTML turned out to be the foundation for agentic video making from @liu8in...](https://x.com/petergyang/status/2068755908319236338) · ❤️ 46 · 🔄 3

### Nan Yu — @thenanyu
> *head of product @linear*

Linear 团队对质量的执念被概括为"质量是非理性的"——必须以非理性的承诺在每个决策点都选择质量，单纯的口号或流程解决不了。同步对邮箱供应商默认行为问题的吐槽。

- 🔗 [Quality is irrational... You have to have an irrational level of commitment...](https://x.com/thenanyu/status/2068778750800531640) · ❤️ 69 · 🔄 6

### Swyx — @swyx
> *achieve ambition with intentionality, intensity, integrity & insanity. affiliations: @dxtipshq @cognition @temporalio @aidotengineer @latentspacepod*

为新创的 New Media Lab 选保险公司，对比下来 Corgi 的 NPS 极高；同时随手调侃让 wills 们去尝试某个新工具（poaster session）。

- 🔗 [btw i've been shopping around for insurers for the New Media Lab...](https://x.com/swyx/status/2068924451887129055) · ❤️ 56 · 🔄 1
- 🔗 [@QuinnyPig i think this is where i challenge @willccbb...](https://x.com/swyx/status/2068868744206799270) · ❤️ 7 · 🔄 0
- 🔗 [@QuinnyPig t.co/6639ddlPvc](https://x.com/swyx/status/2068868568348070344) · ❤️ 6 · 🔄 0

## 🛠️ AI 工具 / Agent

> 数据源：AI HOT API | 过去 24 小时精选 | 按质量分 + 时间排序

| # | 标题 | 来源 | 分类 | 时间 | 摘要 |
|---|------|------|------|------|------|
| 1 | [微信Agent小微灰度内测：主入口发消息红包，子入口可读聊天记录](https://mp.weixin.qq.com/s/qVdfx01e9C9r5mGi0jh2BA) | 公众号：数字生命卡兹克 | 产品发布/更新 | 06-22 21:34 | 微信Agent小微灰度内测已开始，主入口位于微信首页左上角，支持给好友发消息和红包（需确认），但无法读取聊天记录或向群聊发消息。群聊和私聊的"问小微"子入口则可读取聊天记录并支持群发。小微可创建日程提醒、待办、总结朋友圈，打通公众号和视频号进行问答。收藏仅可读取小微自建笔记。内置"小工具"功能，支持语音创建简易小程序（暂不可发布），还可调用第三方小程序。 |
| 2 | [集体AI智能：前沿模型推动智能叠加](https://x.com/omarsar0/status/2069039934871069148) | X：Elvis Saravia (@omarsar0, DAIR.AI) | 产品发布/更新 | 06-22 20:48 | 这只是集体AI智能将带来什么的一瞥。  我们尚未真正破解多智能体编排，但每推出一款新前沿模型，智能应该会叠加。 |
| 3 | [让大模型从"一问一答"走向"边看边说"，京东开源实时视频视觉语言交互模型 JoyAI-VL-Interaction](https://www.ithome.com/0/967/058.htm) | IT之家（RSS） | 模型发布/更新 | 06-22 16:40 | 京东官方宣布开源实时视频视觉语言交互模型 JoyAI-VL-Interaction，这是全球首个全栈开源的 interaction 模型和系统，获 vLLM-Omni day-0 原生支持。该模型具备三重突破：主动判断（持续观察视频流自主决定何时说话）、实时响应（面向正在发生的视频流即时响应）、适时智能体委托（复杂任务转交后台模型，前台继续观察）。支持摄像头、直播流、监控流等视频输入，以及语音输入输出、可视化界面、长期记忆和 vLLM 部署。在 58 个真人盲评案例中，对比豆包视频通话助手总体胜率 77.6%，对比 Gemini 视频通话助手总体胜率 87.9%。 |
| 4 | [Anthropic 工程负责人：Claude Code 让程序员更孤独](https://www.ithome.com/0/967/216.htm) | IT之家（RSS） | 技巧与观点 | 06-22 21:25 | 6月22日，Anthropic工程负责人Fiona Fung表示，Claude Code和Claude Cowork等AI智能体让工程师越发依赖智能体工作，彼此之间交流减少，长期易感孤独。团队为此组织编程午餐、黑客松和共同开发时段，重新创造面对面协作机会。调查显示Claude Code已成为创业公司最常用的AI编程工具，"氛围编程"兴起使"单人创业者"增多，但Fung强调协作仍不可或缺。 |
| 5 | [PP-OCRv6 on Hugging Face：50 语言 OCR，参数规模 1.5M 至 34.5M](https://huggingface.co/blog/PaddlePaddle/pp-ocrv6) | Hugging Face：Blog（RSS） | 模型发布/更新 | 06-22 21:18 | PP-OCRv6 是 PaddleOCR 最新一代通用 OCR 模型族，提供 tiny（1.5M）、small（7.7M）和 medium（34.5M）三级。medium 和 small 支持 50 种语言（简体/繁体中文、英文、日文及 46 种拉丁语系）。在官方多场景基准上，medium 检测 Hmean 86.2%，识别准确率 83.2%，较 PP-OCRv5_server 分别提升 +4.6 和 +5.1 个百分点。模型采用 PPLCNetV4 统一骨干、RepLKFPN 检测模块和 EncoderWithLightSVTR 识别模块，可通过 PaddleOCR、Transformers、ONNX Runtime 等后端灵活部署。 |
| 6 | [百川智能联合清华发布医疗增强大模型 Baichuan-M4，登顶 OpenAI 医疗评测](https://www.ithome.com/0/967/106.htm) | IT之家（RSS） | 模型发布/更新 | 06-22 17:12 | 6月22日，百川智能与清华大学联合发布医疗增强大模型Baichuan-M4。该模型在OpenAI提出的HealthBench及Hard、Professional三个榜单上同时位列世界第一，综合得分68.6，领先第二名GPT-5.5超10分，幻觉率仅3.3%。M4会主动追问症状细节并优先排查危急重症。在基于OSCE构建的动态问诊评测SCAN-bench中，M4初诊79.0、复诊74.7，全面领先GPT-5.5等模型。模型具备"全病程记忆"，长上下文临床记忆得分86.9；首创"证据锚定"循证引用，精度达90.0，远超GPT-5.5和OpenEvidence。 |
| 7 | [Recall：Claude Code 的本地项目记忆工具](https://github.com/raiyanyahya/recall) | Hacker News 热门（buzzing.cc 中文翻译） | 产品发布/更新 | 06-22 15:08 | Recall 是为 Claude Code 设计的完全本地项目记忆工具。它自动记录每次会话日志（history.md），并通过 TF-IDF + TextRank 提取式摘要算法在本地生成压缩摘要（context.md，约 1-2K token），无需调用任何外部模型或 API 密钥。摘要完全在本地完成，不消耗 Claude Code 的模型 token，可离线使用，解决会话冷启动问题。用户可通过 `/recall：save` 和 `/recall：show` 命令管理记忆，与 Claude 内置的 CLAUDE.md 和 `--continue` 功能互补。 |
| 8 | [GLM-5.2：开放智能体的阶跃变化](https://www.interconnects.ai/p/glm-52-is-the-step-change-for-open) | Nathan Lambert：Interconnects（RSS） | 模型发布/更新 | 06-22 22:52 | Z.ai 于 6 月 13 日向 GLM Coding Plan 成员发布 GLM-5.2，6 月 16 日开源 MIT 许可权重。该模型在 Arena 智能体排行榜上成为唯一与 OpenAI 和 Anthropic 最新模型匹敌的开放模型，匹配 Opus 4.8 无思考模式；在 Design Arena 中甚至超越 Claude Fable。作者认为这是自 DeepSeek R1 以来最受关注的开放模型发布，GLM-5.2 是首个在编码工具中作为通用智能体表现合格的开放权重模型。从 Claude Opus 4.5 发布（2025 年 11 月 24 日）到 GLM-5.2 发布（2026 年 6 月 16 日）间隔约 6.8 个月。 |
| 9 | [Serva总结AI平台防封号四件套方案](https://x.com/berryxia/status/2069025740415451612) | X：Berry Xia (@berryxia) | 技巧与观点 | 06-22 19:52 | Berry Xia推荐Serva总结的AI平台防封号方案，针对Claude/ChatGPT因风控被封号。四件套包括：eSIM卡（BeeSIM硬件+giffgaff英国号）获取真实海外手机号；静态住宅IP（EqualVPN美国家庭宽带）避免数据中心IP；指纹浏览器（AdsPower）模拟美国用户环境；虚拟卡（YIKA美国发卡）匹配账单地址。核心思路是将注册、登录、支付、使用全流程身份信号对齐为真实美国用户。单独用VPN或虚拟卡效果有限，四件套组合更稳定。原文附有详细截图步骤。 |
| 10 | [Sakana AI 推出 Fugu：动态协调多 LLM 的系统，匹配 Anthropic 顶级模型性能](https://the-decoder.com/sakana-ais-fugu-orchestrates-multiple-llms-to-match-anthropics-fable-and-mythos-benchmarks) | The Decoder：AI News（RSS） | 产品发布/更新 | 06-22 16:18 | 日本 AI 初创公司 Sakana AI 发布 Fugu，一个能动态协调多个大语言模型的系统。Fugu 本身也是一个语言模型，可从可替换的智能体池中调用其他 LLM（含自身副本），通过单一 OpenAI 兼容 API 提供服务。Fugu 有基础版和 Fugu Ultra 变体。Sakana 公布的基准测试显示，Fugu Ultra 在编码、推理、科学和智能体评测中与 Anthropic Fable 5 和 Mythos Preview 表现相当。Fugu 旨在降低对单一 AI 供应商的依赖，模型池可完全替换。约 500 名 Beta 用户在长流程任务中测试，Fugu Ultra 的 bug 捕获量远超 GPT 5.5。两个变体现在已通过 API 上线。 |
| 11 | [字节小云雀短剧 Agent 2.0 上线：Seedance 2.0 Mini 模型降价，新增720度场景与3D导演台](https://mp.weixin.qq.com/s/wHZ-WAeK2ROOXxe81LFVpQ) | 公众号：卡尔的AI沃茨 | 技巧与观点 | 06-22 19:10 | 字节旗下小云雀短剧 Agent 2.0 上线，核心升级包括 Seedance 2.0 Mini 模型（价格更低）及 720 度场景观看、3D 导演台（可摆放 3D 人偶设定角色位置与机位）等功能。资产库根据剧本生成详细提示语，支持多角色形象切换。单个镜头时长 1-10 秒，生成 15 秒视频约需 4-5 分钟，自带字幕可抹除。用户可用约三百元成本完成一集短剧，支持片段续接和首尾帧参考，最终一键导出到剪映。该工具旨在降低原创短剧制作门槛，尤其适合规则类、多场景反转等题材。 |
| 12 | [AI编程工具（vibe-coding）应用安全隐患突出](https://www.theverge.com/ai-artificial-intelligence/950844/vibe-coding-security-risks-apps) | The Verge：AI（RSS） | 技巧与观点 | 06-22 19:00 | 借助AI编程工具（vibe-coding），非专业开发者能快速构建应用，但安全隐患激增。案例包括Boomberg网站发现SQL注入漏洞、PocketOS创始人AI编码代理清空生产数据库，以及完全由AI构建的社交网络Moltbook因数据库开放暴露数万条邮件地址。研究显示约5000个公开应用无身份验证，近2000个泄露敏感数据。安全专家指出，当个人应用处理他人数据时，安全标准必须提高。 |
| 13 | [GLM-5.2 与 Claude Opus 4.8 正面较量：构建3D WebGL平台游戏](https://techstackups.com/comparisons/glm-5.2-vs-opus) | Hacker News 热门（buzzing.cc 中文翻译） | 技巧与观点 | 06-22 17:16 | 最新开源 GLM-5.2（Z.ai，MIT 许可，1M token 上下文，输出定价 $4.4/百万 token）与 Claude Opus 4.8 在单次提示构建 3D WebGL 平台游戏任务上对比。Opus（Claude Code）用时 33 分 30 秒，成本约 $21.92；GLM-5.2（Pi/OpenRouter）用时 1 小时 10 分 40 秒，成本仅 $5.39。Opus 游戏更干净、能自检视觉输出（GLM-5.2 纯文本），但 GLM-5.2 价格低且开源权重可下载，始终可用。 |
| 14 | [沉浸式翻译接入免费模型教程：以小米MiMo为例](https://x.com/berryxia/status/2069070151723671760) | X：Berry Xia (@berryxia) | 技巧与观点 | 06-22 22:49 | 教程演示如何将免费或低成本模型接入沉浸式翻译。步骤：设置→翻译服务→添加自定义翻译服务→选择"自定义AI"→填入API Key和接口地址（以小米MiMo为例，Base URL： `https：//api.xiaomimimo.com/v1/chat/completions`）→选择对应模型（可勾选"输入自定义模型名称"）→点击测试服务，通过即完成配置。后续可在服务选项中切换使用自定义模型。全程视频演示。 |
| 15 | [Sakana AI 发布 Fugu 和 Fugu Ultra 多智能体编排系统](https://x.com/testingcatalog/status/2068967746638131301) | X：Testing Catalog (@testingcatalog) | 模型发布/更新 | 06-22 16:02 | Sakana AI 宣布推出 Fugu 和 Fugu Ultra 系统。Fugu 是一个多智能体编排模型，训练用于操控其他 LLM，通过单一模型 API 访问。其中 Fugu Ultra 在多项基准测试中性能匹敌 Claude Fable 5 和 Mythos 5，并宣称提供前沿能力且规避出口管制风险。该系统目前通过 API 提供服务，但暂不支持 EEA 地区。推文指出，编排式多模型系统将超越单一模型，使小型实验室和企业更易构建，并已促使 Meta、Apple、微软等巨头考虑采用竞争对手的模型搭建编排系统。 |


## 🤖 LLM 理论

> 数据源：AI HOT API 论文分类 + 模型发布里 LLM 相关 | 过去 24 小时精选

| # | 标题 | 来源 | 时间 | 摘要 |
|---|------|------|------|------|
| 1 | [TMax发布：开源终端智能体RL配方与数据](https://x.com/natolambert/status/2069055254961021150) | X：Nathan Lambert (@natolambert) | 06-22 21:49 | TMax 是面向终端任务的开源 RL 配方，基于 Qwen 3.5 较小密集模型，在默认设置和 65k token 预算下超越此前开源工作。训练需 8 节点 H100（2 训练+6 推理）运行 2-3 天，配方经约 100 次训练才稳定。发布模型权重、数据及训练 rollouts。配方工作强调从零获得初始基线成本高昂（1 万至百万美元），需要明确决策阶梯和稳定性改进。 |
| 2 | [多智能体通信协议五维分类法报告发布](https://x.com/omarsar0/status/2069066883995758814) | X：Elvis Saravia (@omarsar0, DAIR.AI) | 06-22 22:36 | 该报告针对LLM多智能体系统的通信瓶颈，构建了五维分类法（对方、有效载荷、交互状态、发现机制、模式灵活性），系统梳理了9个积极维护的开源智能体协议，覆盖MCP和A2A的实际格局。报告发现两个突出模式：每个智能体间协议都采用混合有效载荷与会话状态持久化组合，而去中心化发现机制仍极为罕见。领域正悄然标准化有状态会话，但发现与策略执行层仍留白。该报告为今年选择通信层时提供了九大协议的真实对比参考。 |
| 3 | [PerceptionDLM：平行区域感知多模态扩散语言模型](https://x.com/_akhaliq/status/2069079745824796900) | X：AK (@_akhaliq) | 06-22 23:27 | PerceptionDLM  平行区域感知与多模态扩散语言模型 |



## 🦾 具身智能

> **本节状态说明**：本轮测试未抓取。本主题按 `user_config.md` 走 X.com（关键词：embodied intelligence / Figure AI / Tesla Optimus / humanoid robot / 1X / Apptronik / Unitree / embodied AI），需要 `/ego-browser` skill 打开 X.com 搜索页和账号主页。本轮测试范围限定在 API/JSON 可达的数据源 + 复用上次抓取结果，ego-browser 抓取未执行。



## 🧠 思维模型

> **本节状态说明**：本轮测试未抓取。本主题按 `user_config.md` 走 YouTube + Reddit（r/productivity, r/selfimprovement, r/stoicism, r/getdisciplined）+ X.com + 即刻，需要 `/ego-browser` skill 抓取多平台页面 + `/media/youtube-content` skill 拉 YouTube 字幕做深度总结。本轮测试范围限定在 API/JSON 可达的数据源，ego-browser 抓取未执行。

> **下次抓取建议**：正式运行时按主题 ID `mental_models` 走多平台抓取，重点关注心智框架、认知偏差、行为经济学领域的高互动内容；YouTube 视频强制走 `/media/youtube-content` 拉字幕做章节/摘要/引用版深度总结。


## 👨‍👩‍👧 家庭教育

> **本节状态说明**：本轮测试未抓取。本主题按 `user_config.md` 走 YouTube + Reddit（r/Parenting, r/ScienceBasedParenting, r/Montessori）+ X.com + 即刻，需要 `/ego-browser` skill 抓取多平台页面 + `/media/youtube-content` skill 拉 YouTube 字幕。本轮测试范围限定在 API/JSON 可达的数据源，ego-browser 抓取未执行。

> **下次抓取建议**：正式运行时按主题 ID `family_education` 走多平台抓取，重点关注数据育儿、儿童发展心理学、家庭教育方法学的内容；YouTube 视频强制走 `/media/youtube-content` 拉字幕。


## 💰 投资管理

> **本节状态说明**：本轮测试未抓取。本主题按 `user_config.md` 走 YouTube + Reddit（r/investing, r/financialindependence, r/Bogleheads）+ X.com + 即刻，需要 `/ego-browser` skill 抓取多平台页面 + `/media/youtube-content` skill 拉 YouTube 字幕。本轮测试范围限定在 API/JSON 可达的数据源，ego-browser 抓取未执行。

> **下次抓取建议**：正式运行时按主题 ID `investment_management` 走多平台抓取，重点关注长期投资策略、指数基金、市场数据分析、被动投资理念；YouTube 视频强制走 `/media/youtube-content` 拉字幕。


## 🛠️ FDE 行业发展

> **本节状态说明**：本轮测试未抓取。本主题按 `user_config.md` 走 X.com（多关键词组合：Forward Deployed Engineer / FDE / OpenAI deployment / Anthropic Accenture / Salesforce FDE / Palantir FDSE / agentic workflow enterprise）+ YouTube + Reddit（r/MachineLearning, r/ExperiencedDevs, r/salesengineering），需要 `/ego-browser` skill 抓取 X.com 多组搜索 + 7 个固定信源 + 关注账号。本轮测试范围限定在 API/JSON 可达的数据源，ego-browser 抓取未执行。

> **下次抓取建议**：正式运行时按主题 ID `fde_industry` 走多平台抓取，重点关注 OpenAI/Anthropic/Salesforce/Palantir/Dify/n8n 的部署公告和企业 AI 实施经验；X.com 关注账号包括 @PalantirTech / @OpenAI / @AnthropicAI / @dify_ai / @n8n_io；YouTube 视频强制走 `/media/youtube-content` 拉字幕。


## 🔔 关注账号动态

> 数据源：X.com 关注账号 + 抓取于 2026-06-22 23:50 | 互动量降序，5 条/账号上限
> **本节范围说明**：本轮测试只复用了已抓的关注账号抓取结果（来自上一次 6-22 报告），未重新走 ego-browser 抓取——测试目的为验证"中文优先 + 完整不截断"新规则在已有数据上的执行情况。

### AI / 具身智能（6 账号）

#### @karpathy (Andrej Karpathy) — AI / 深度学习
**中文身份**：前 Tesla AI 总监、OpenAI 创始成员、Stanford 知名讲师，2026 年中以个人身份加入 Anthropic 重回 R&D 轨道。

最近一条关键更新：2025 年底前持续点评 Claude Fable 5，称之为"首次让我闻到'magic model smell'的模型"——这种质变区别于前几代能力堆叠。前序 5 周集中观察了医药领域多个突破（retatrutide 三靶点 GLP-1、胰腺癌新药等），并发推称之为"medicine 的奇迹月"。

- 🔗 [The hottest new programming language is English](https://x.com/karpathy/status/1617979122625712128) · ❤️ 73,367 · 🔄 10,893
- 🔗 [Claude Fable 5 是同样的底层模型，但加了 safeguards...定性地说这是配得上 major version bump 的阶跃](https://x.com/karpathy/status/2064409694761054332) · ❤️ 25,447 · 🔄 2,845
- 🔗 [In awe of SpaceX and its story — past, present and the future...](https://x.com/karpathy/status/2065490793092337691) · ❤️ 21,596 · 🔄 1,051
- 🔗 [medicine 的奇迹月：retatrutide 三靶点、RevMed 胰腺癌新药、Retatrutide 临床进展](https://x.com/DKThomp/status/2061110056293106118) · ❤️ 11,683 · 🔄 2,067
- 🔗 [Personal update: I've joined Anthropic...](https://x.com/karpathy/status/2056753169888334312) · ❤️ 150,289 · 🔄 18,670

#### @DrJimFan (Jim Fan) — 具身智能 / AI 研究 / NVIDIA
**中文身份**：NVIDIA GEAR Lab 主任研究员、Stanford 客座教授、具身智能领域一线 KOL。

最近一条关键更新：2026 年中公布 ENPIRE（Embodied Physical Intelligence Research Engine）——首次把 8 个 Codex 智能体装到 8 台真机上，配 GPU 配额和 token 预算，让它们自主解决"保持机器人忙"这一简单目标，安全用硬件急停 + 扭矩受限夹爪双层兜底。目标是把 LLM 的成功剧本平行复刻到物理世界。

- 🔗 [Today, we enable AutoResearch in the physical world for the first time! Introducing ENPIRE...](https://x.com/DrJimFan/status/2066921736369766762) · ❤️ 3,793 · 🔄 714
- 🔗 [Robotics: Endgame — the sequel to my last year's Sequoia AI Ascent talk, "Physical Turing Test"...](https://x.com/DrJimFan/status/2052758642781487237) · ❤️ 3,486 · 🔄 675
- 🔗 [Project site: research.nvidia.com/labs/gear/enpire/ ... Wenli has written an excellent technical thread...](https://x.com/DrJimFan/status/2066921739087726043) · ❤️ 150 · 🔄 18
- 🔗 [I made Physical AutoResearch sound simple (conceptually), but it took a village...behind-the-scene tour: 1. Safety harness...](https://x.com/DrJimFan/status/2067304433843868118) · ❤️ 25 · 🔄 3
- 🔗 [机器人新号 - 今天 推出 AutoResearch...](https://x.com/DrJimFan/status/2067304433843868118) · （同上补充）

#### @adcock_brett (Brett Adcock) — Figure AI 创始人 / 具身智能
**中文身份**：Figure AI（人形机器人独角兽）创始人、Archer Aviation 创始人。

最近一条关键更新：Figure AI 员工总数刚过 ~314 名薪资雇员 + 大量合同工；本周早些时候"机器人数量首次超过员工人数"成为里程碑——可被解读为人形机器人产业化开始进入"工厂 + 仓库 + 真实作业"阶段（区别于 demo 阶段）。

- 🔗 [For the first time, robots now outnumber humans at Figure](https://x.com/adcock_brett/status/2068040783295627609) · ❤️ 4,320 · 🔄 454
- 🔗 [Today I'm excited to share that Hark has raised $700M at a $6B valuation...](https://x.com/adcock_brett/status/2057462134989263047) · ❤️ 1,842 · 🔄 202
- 🔗 [Figure has only ~314 salaried employees, the rest are hourly/contractors](https://x.com/adcock_brett/status/2068131522620846112) · ❤️ 563 · 🔄 20

#### @_akhaliq (AK) — HuggingFace Papers 速递 / ML 前沿
**中文身份**：HuggingFace 开发者关系工程师，每天扫 arxiv + 顶会新论文并机器生成 demo。

最近一条关键更新：HuggingFace Papers 关注者逼近 1000（"almost 1000 followers on Huggingface"）；同时转发 GLM-5.2 在 PostTrainBench 上击败 GPT-5.5 和 Opus 4.8 的论文摘要。

- 🔗 [for daily papers, authors can directly submit them here:](https://x.com/_akhaliq/status/1844746338396770616) · ❤️ 585 · 🔄 50
- 🔗 [Holy moly almost 1000 followers on Huggingface](https://x.com/0xSero/status/2068493741699060116) · ❤️ 241 · 🔄 5
- 🔗 [GLM-5.2 is the literal SOTA on PostTrainBench  Beating GPT-5.5 and Opus 4.8](https://x.com/NielsRogge/status/2068437150434025804) · ❤️ 80 · 🔄 14

#### @emollick (Ethan Mollick) — Wharton 教授 / AI 应用 / 教育创新
**中文身份**：Wharton 商学院教授，One Useful Thing 博客作者，专攻 AI 在工作与教育场景的应用实证研究。

最近一条关键更新：给 GPT-5.5 Pro 喂了自己研究生时期的第一篇论文，让 AI 找出错误并更新——AI 找到了新数据、新分析、可复现文件、扩展了核心论点。同步追问："我们是否已经应该把这种 AI 部署到学术研究回顾上？"

- 🔗 [I have a new book coming out October 20: Co-Existence! It is about how we live & work with AIs that are sometimes (but not always) smarter than we are...](https://x.com/emollick/status/2062645525111771521) · ❤️ 753 · 🔄 100
- 🔗 [The interaction between AI & past scholarly work is going to get weird. Here I gave GPT-5.5 Pro a copy of my first published paper from grad school & asked it to find errors and update it...](https://x.com/emollick/status/2068507998343885284) · ❤️ 821 · 🔄 80
- 🔗 [This is good stuff, including some things that are much more sophisticated than what I wrote in paper long ago. What happens when we turn this sort of AI loose on past academic research at scale?](https://x.com/emollick/status/2068508643406864866) · ❤️ 241 · 🔄 9

#### @mckaywrigley (McKay Wrigley) — AI 工具 / 开发者
**中文身份**：独立 AI 工程师、x.ai 合作者、推特上 AI 工程圈高活跃度 KOL。

最近一条关键更新：恭喜 Cursor 团队三周年，回忆起 3 年前 fork 的那个开源 Cursor 仓库现在还在自己笔记本上；以及对 Claude Fable 5 的体感评价——"1st model to me that had 'magic model smell'... already miss it"。

- 🔗 [I couldn't code 18 months ago. Yesterday I raised over $20,000 from initial customers to get my software business off the ground. Believe in yourself, be relentlessly resourceful, be relentlessly optimistic, and never give up.](https://x.com/mckaywrigley/status/1286663173861408770) · ❤️ 8,928 · 🔄 689
- 🔗 [major congrats to the cursor team! can't believe it's already been 3+ years - what a legendary run (keep going!). fun fact: i still have the original open source cursor repo on my laptop :)](https://x.com/mckaywrigley/status/2066969329514709295) · ❤️ 111 · 🔄 3
- 🔗 [fable 5 was the 1st model to me that had "magic model smell." beautifully digital mind imbued with a touch of the divine. i already miss it.](https://x.com/mckaywrigley/status/2065633404645933325) · ❤️ 793 · 🔄 24

### 软技能 / 投资（4 账号）

#### @charliebilello (Charlie Bilello) — Creative Planning 首席市场策略师
**中文身份**：Creative Planning 首席市场策略师，Signal or Noise 视频播客主理人，专攻长期投资与市场数据。

最近一条关键更新：本周宏观数据三条——美国政府当前消费占经济比例为史上最高；债务上限不到一年提高 $5T，国债已增 $3T，按此速度 2027 年又要"提高天花板"；资金流向在亚洲股票市场呈现极端分化（韩国 +126% / 台湾 +73% / 中国 -12%）。

- 🔗 [The Madness of Crowds... New Episode of Signal or Noise w/ @PeterMallouk...](https://x.com/charliebilello/status/2067639723380592805) · ❤️ 96 · 🔄 14
- 🔗 [The US government has never consumed a larger share of the economy than it does today.](https://x.com/charliebilello/status/2068685366022811657) · ❤️ 135 · 🔄 41
- 🔗 [The debt ceiling was raised by $5 trillion less than a year ago. And US national debt has already increased by over $3 trillion. At this pace, we'll be back debating another "ceiling" in 2027.](https://x.com/charliebilello/status/2068680339334037865) · ❤️ 98 · 🔄 30
- 🔗 [Capital is voting with its feet. South Korea stocks are up 126% in 2026. Taiwan stocks are up 73%. China stocks are down 12%. One of the widest performance gaps we've ever seen.](https://x.com/charliebilello/status/2068675887143223325) · ❤️ 235 · 🔄 39

#### @george__mack (George Mack) — 思维模型 / 心智框架
**中文身份**：独立营销人 + 写作者，《The Mack Method》作者，专攻 agency、distribution 与心智模型。

最近一条关键更新：在 agency 主题上进一步阐释"low agency triangle"——第一块是"怕别人怎么想"，整篇指出如果不主动定义自己是谁，就会一生困在模糊的"脸孔集合"里。同时给德约科维奇"三年不吃糖、只融化一颗巧克力"的极端自律举例。

- 🔗 [After 7 months of writing, I finished my essay! I think agency might be the most important idea of the 21st century](https://x.com/george__mack/status/1904182016536650035) · ❤️ 3,543 · 🔄 795
- 🔗 [There is no single "correct" path to the top. Novak Djokovic went 3 years without sugar, let one piece of chocolate melt on his tongue after the longest tennis match ever... then went straight back to training. Roger Federer won the Australian Open eating ice cream every single...](https://x.com/newstart_2024/status/2068022107343102054) · ❤️ 4,121 · 🔄 354
- 🔗 ["I'm afraid of what people will think." The first part of the low agency triangle. What's fascinating but terrifying is how easy it is to go through an entire lifetime without ever defining *who*. The who lives in the shadows. Undefined. Vague. A blob of faces in the dark like...](https://x.com/george__mack/status/2068006644118933937) · ❤️ 457 · 🔄 52

#### @ProfEmilyOster (Emily Oster) — 布朗大学经济学教授 / 数据育儿
**中文身份**：布朗大学经济学教授、《ParentData》博客与 Substack 作者，专攻用数据方法重新分析家庭决策。

最近一条关键更新：处理"大孩子日托午睡"问题——这个被很多家长事后才发现的痛点；同时发布新文章谈如何用工具系统性解决孩子睡眠问题。

- 🔗 [Day care napping for older children. An issue that a surprising number of parents have and no one anticipates](https://x.com/ProfEmilyOster/status/2066539058688356611) · ❤️ 17 · 🔄 3
- 🔗 [Is your desire for more hair getting in the way of your sperm? I investigate what the data says](https://x.com/ProfEmilyOster/status/2056343888026054817) · ❤️ 7 · 🔄 1
- 🔗 [Kid sleep can be really tough for parents -- today in ParentData I talk about how you can invest in fixing your sleep issues, along with a (free) tool to plan it for yourself.](https://x.com/ProfEmilyOster/status/2053815039308513456) · ❤️ 9 · 🔄 2

#### @AdamMGrant (Adam Grant) — Wharton 组织心理学家
**中文身份**：Wharton 组织心理学教授、《Think Again》与《Hidden Potential》作者，专攻动机、利他、原创性研究。

最近一条关键更新：核心观点"重新思考是学习的清晰信号"——附 21 条 2021 年重新思考过的清单；用 GPT-5.5 给自己的研究生论文做"AI 同行评议"实验，结论是"高智力女性面临更多敌意，男性则不受影响——早该把女性智力当成资产而非威胁"；指出"不读书的领导者是停滞的领导者"。

- 🔗 [One of the clearest signs of learning is rethinking your assumptions and revising your opinions. 21 things I rethought in 2021: a thread...](https://x.com/AdamMGrant/status/1477298927636566016) · ❤️ 42,269 · 🔄 14,978
- 🔗 [The smarter women are, the more hostility they face. In the U.S. & China, the higher women's IQs, the less they're liked—and the more they're undermined by coworkers. Men pay no price for being bright. It's long past time to recognize female intellect as an asset, not a threat.](https://x.com/AdamMGrant/status/2066508963030376550) · ❤️ 7,993 · 🔄 2,256
- 🔗 [Emotional intelligence is not about avoiding strong reactions. It's about being less reactive. Reactions are hard to control—they're rapid and visceral. Responses are easier to delay and modify. A key to emotion regulation is expanding the distance between feelings and actions.](https://x.com/AdamMGrant/status/2065791098669392272) · ❤️ 1,011 · 🔄 248
- 🔗 [A telltale sign of an ignorant leader is failing to read books. Fiction builds empathy and imagination. Nonfiction boosts concentration and critical thinking. Not reading fuels mental stagnation. Leaders who "don't have time to read" are leaders who don't make time to learn.](https://x.com/AdamMGrant/status/2064723399985819850) · ❤️ 1,174 · 🔄 301
- 🔗 [An easy way to get unstuck is to get up and take a walk. We generate more creative ideas during and after walking outdoors—and even on a treadmill facing a blank wall. Divergent thinking rarely happens when we're tethered to a desk. Moving our bodies frees our minds.](https://x.com/AdamMGrant/status/2063267968671236523) · ❤️ 1,535 · 🔄 391

### FDE 行业（5 账号）

#### @PalantirTech (Palantir) — FDE 文化源头 / 前向部署
**中文身份**：Palantir Technologies 官方账号，是 FDSE（Forward Deployed Software Engineer）角色文化的源头公司。

最近一条关键更新：发布 Security Forge——基于 ML 的源码漏洞检测平台，demo 中自主扫描代码库、109 个 flag 压缩到 10 个可执行项、整条流程成本 $78；同步宣布加入 S&P 500。CEO Alex Karp 公开评论前沿实验室"过度乐观是另一种宗教"。

- 🔗 [We are deeply grateful to be admitted to the S&P 500. Only in America!](https://x.com/PalantirTech/status/1832325967194259831) · ❤️ 8,867 · 🔄 1,212
- 🔗 [Defend the enterprise. Security Forge, our new cyber security offering for source code vulnerability detection that moves at machine speed. See how Chad and George used it to autonomously scan a codebase, compress 109 flags down to 10 actionable findings, and do it for $78...](https://x.com/PalantirTech/status/2066613561791516709) · ❤️ 732 · 🔄 110
- 🔗 [Factory to foxhole. Mud to Moon. Palantir is the Operating System of Reindustrialization. Join us in Detroit @reindsummit to see how Palantir is giving American workers and warfighters an unfair advantage.](https://x.com/PalantirTech/status/2066597114428207528) · ❤️ 565 · 🔄 69
- 🔗 [Palantir CEO Alex Karp on the false religion of frontier labs: "Philosophically it's wrong because it's not doomer versus not-doomer; it's a hyper-religion of hyper-optimism."](https://x.com/PalantirTech/status/2064792917248508258) · ❤️ 1,830 · 🔄 205
- 🔗 [Watch the full demo:](https://x.com/PalantirTech/status/2066613563741933682) · ❤️ 66 · 🔄 3

#### @OpenAI (OpenAI) — AI 部署 / enterprise 公告
**中文身份**：OpenAI 官方账号，发布产品、研究与企业合作。

最近一条关键更新：与波士顿儿童医院 + 哈佛合作，o3 Deep Research 帮助临床医生重新审视"多年未解"的小儿罕见病案例；同步发布"训练模型在压力下保持有益行为"的研究；GPT-5.5 Instant 在健康类问题上追平 Thinking 模型能力。

- 🔗 [Together with researchers at Boston Children's Hospital and Harvard, we published a study in NEJM AI showing how o3 Deep Research helped clinicians revisit previously unsolved rare pediatric disease cases, and find answers for families who had waited years.](https://x.com/OpenAI/status/2067625110199247353) · ❤️ 2,889 · 🔄 439
- 🔗 [As AI takes on longer, higher-stakes tasks, we want models to carry beneficial and safe behavior into new domains beyond their training—and maintain it under pressure. That's the idea behind our new research on training models to be broadly and persistently beneficial.](https://x.com/OpenAI/status/2067722688165232654) · ❤️ 2,746 · 🔄 330
- 🔗 [We also tested whether alignment persisted under pressure. The model was harder to steer toward harmful behavior with adversarial prompts, while remaining responsive to helpful instructions. We saw preliminary evidence of greater resistance to harmful fine-tuning.](https://x.com/OpenAI/status/2067722695270334549) · ❤️ 238 · 🔄 11
- 🔗 [This is an early step toward more robustly beneficial and aligned models: training models to carry beneficial traits into new situations, so as AI becomes more capable, it also becomes more reliable, transparent, and helpful for people.](https://x.com/OpenAI/status/2067722696759329125) · ❤️ 217 · 🔄 7
- 🔗 [GPT-5.5 Instant is now on par with our frontier Thinking models for health-related questions. Every week, more than 230 million people turn to ChatGPT with health and wellness questions, and GPT-5.5 Instant is better at recognizing when urgent care may be needed, asking for...](https://x.com/OpenAI/status/2067672740539306261) · ❤️ 4,152 · 🔄 390

#### @AnthropicAI (Anthropic) — AI 部署 / 企业合作公告
**中文身份**：Anthropic 官方账号，发布 Claude 系列模型、Anthropic Economic Index、企业合作。

最近一条关键更新：发布 Project Fetch Phase 2——让 Claude 自主编程控制机械狗，相比去年 Opus 4.1 辅助下的人类团队快约 20 倍（但机械狗还是没成功把沙滩球捡回来）。同步发布 Claude Code 用户行为追踪框架——发现"领域专家"在 Claude Code 上的成功率更高，但中级与专家之间的差距比预期小。

- 🔗 [New Frontier Red Team blog: Phase 2 of Project Fetch, where we test how well Claude can program a robodog. Opus 4.7, on its own, was ~20x faster than last year's best human team aided by Opus 4.1. (The robodog, alas, still failed to fetch a beach ball.)](https://x.com/AnthropicAI/status/2067651699486200091) · ❤️ 2,137 · 🔄 245
- 🔗 [Watch the robodogs in action in our first Project Fetch experiment:](https://x.com/AnthropicAI/status/2067651700757086553) · ❤️ 255 · 🔄 29
- 🔗 [Our latest economic research introduces a framework for tracking Claude Code as it scales. Who is using Claude Code, and what are they using it for? How is the value of tasks changing? And how much does domain expertise shape whether a session succeeds?](https://x.com/AnthropicAI/status/2066969532380721386) · ❤️ 3,478 · 🔄 562
- 🔗 [Domain experts—as judged by the questions they ask and vocabulary they use about a subject—are more likely to see success. But the gap between intermediate and expert users is quite modest, suggesting that proficiency in a domain is sufficient to code successfully within it.](https://x.com/AnthropicAI/status/2066969540412780644) · ❤️ 494 · 🔄 59
- 🔗 [These and other measures will allow us to track consequential shifts in the nature of work as they happen—we'll incorporate some of them into the Anthropic Economic Index going forward. Read the full report:](https://x.com/AnthropicAI/status/2066969542010806561) · ❤️ 267 · 🔄 35

#### @dify_ai (Dify) — Agent 工具 / 部署实践
**中文身份**：Dify.AI 官方账号，开源 LLM 应用开发平台。

最近一条关键更新：提出企业 AI 落地核心痛点——"问题不是模型，是花几个月重建底座"。同步宣布 MongoDB Atlas + Voyage AI 在 Dify workflow 里原生可用，强化"agent 的价值取决于它能接触的数据 + 检索质量"。正在 AWS Summit Hong Kong 2026 现场 demo。

- 🔗 [Here's what we keep seeing with enterprise AI projects: the models aren't the problem. The months teams spend rebuilding everything underneath them are. Before an AI assistant, workflow, or agent can reach production, someone has to solve model orchestration, knowledge...](https://x.com/dify_ai/status/2067668673100407220) · ❤️ 6 · 🔄 1
- 🔗 [AI agents are only as useful as the data they can reach and the quality of what they retrieve. That's why we're excited to see MongoDB Atlas and Voyage AI now natively available inside Dify workflows. MongoDB Atlas brings the data layer; Voyage AI sharpens retrieval with...](https://x.com/dify_ai/status/2067524723442098342) · ❤️ 3 · 🔄 1
- 🔗 [Dify is LIVE at AWS (@awscloud) Summit Hong Kong 2026! The LangGenius K.K. Team is on the ground right now at the Hong Kong Convention and Exhibition Centre (HKCEC), Wan Chai — and we'd love to see you before the day wraps up. Come by our booth to: • Watch live demos of...](https://x.com/dify_ai/status/2067133087092515095) · ❤️ 6 · 🔄 2

#### @n8n_io (n8n) — AI workflow / 自动化部署
**中文身份**：n8n 官方账号，开源 workflow automation 平台。

最近一条关键更新：发布"四模型对答+互相 peer review + 最终合成共识"的 workflow 模板；同时在 2026 年中举办 n8n Fest 社区聚会。

- 🔗 [Four AI models. One question. They all answer, then peer review each other. A final model synthesizes the consensus. Try it out here:](https://x.com/n8n_io/status/2067940712318972384) · ❤️ 50 · 🔄 8
- 🔗 [Don't miss the chance to hangout with the n8n team, community, and Jan (just look at how excited he is about that tattoo). This event is to celebrate YOU, since n8n wouldn't be what it is without you!](https://x.com/n8n_io/status/2067866023018058126) · ❤️ 17 · 🔄 4


## 🎙️ Podcast 深度摘要

### Training Data —「Google DeepMind Logan Kilpatrick：Why the Model Eats the H(uman)」

> 嘉宾：Logan Kilpatrick — Google DeepMind 开发者关系与产品负责人

**核心观点**：Gemini 3.5 时代标志着 Google 进入"agentic 产品时代"——所有产品从底层 rebase 到 antigravity agent harness，由一个统一的 agent 层把 Google 全部 50+ 产品串成"可代用户执行任务"的执行栈。

**关键洞察**：

- **"模型吞噬一切"在 3.5 时代真正发生**：Gemini 2.0 时点提过类似愿景但太早，3.5 才是能力落地的拐点——"agentic coding" + "agentic products" + "agents" 三件套同时成熟。
- **antigravity 不只是 IDE，而是 Google 全产品的 agent 底座**：包括 core IDE、agent-first web 体验、CLI、SDK 等组件，开发者可以从任意入口接入（Gemini API / IDE / CLI / SDK），体现 Google "meet developers wherever they are" 的生态化思路。
- **历史性"through line"出现**：Gemini 之前 Google 50 个产品没有共同底层，现在 antigravity 在 Gemini 之上又造了一层新的 through line——所有产品都"agentic native"，真正能替用户执行动作。
- **Omni 多模态视频理解的细致度已经悄悄进入内容生产场景**：Logan 举了一个真实例子——观众在直播中实时用 Omni 给他加了一只狗出现在舞台上，其他嘉宾都"自然反应"，模型把"世界理解"的微妙节奏拿捏得很到位。这对内容生产工作流的影响是结构性的。
- **开发者生态布局的方向是"多入口、同一智能"**：不押注单一 IDE 形态，而是让 agent 能力可以从 web、CLI、SDK、IDE 任一入口调用，本质是 LLM 应用层走向"无处不在"。

**关键引用**：

> *原句*："antigravity is a lot of things ... it's really an ecosystem of stuff that we built, and it's designed to sort of, like, meet developers wherever they are."
>
> *中文释义*：antigravity 不只是一款产品，更是一整套开发者生态——Google 设计它的核心理念是"开发者在哪里，agent 能力就跟到哪里"，通过 IDE、CLI、SDK、API 多入口把同一份智能暴露出去。

🔗 [观看完整节目](https://www.youtube.com/watch?v=cMAs8z2dehs)


---

## ⚙️ 抓取备注

- **AI HOT API**：模式 `selected + all`，时间窗过去 24 小时，候选池 ~100 条按 score 排序后筛选；HTTP 200，无错误
- **Follow Builders Feed**：JSON 直拉，11 个 Builder、27 条推文，覆盖 24h；过滤低质量推文（Nan Yu 第 2 条推文 @Outlook 纯吐槽，无实质内容）
- **Follow Builders Podcast**：1 个 Podcast（Logan Kilpatrick：Why the Model Eats the H），转录 56K 字符已按 Chunk if needed 规则提炼
- **AI 工具/agent + LLM 理论**：从 AI HOT API 同一份候选池里按主题侧重筛选——AI 工具取 ai-models + ai-products + tip，LLM 理论取 paper
- **关注账号**：15 个账号基于上次 6-22 抓取结果重写，每账号 ≤ 5 条推文 + 中文身份介绍 + 中文核心观点摘要

