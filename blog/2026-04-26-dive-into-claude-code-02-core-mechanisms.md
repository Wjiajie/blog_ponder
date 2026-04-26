---
slug: dive-into-claude-code-02-core-mechanisms
title: 深入理解 Claude Code 设计原则（二）：核心机制深潜
authors: [jiajiewu]
tags: [软件架构, Claude Code, 论文阅读, Agent]
date: 2026-04-26
description: 拆开 Claude Code 引擎盖，深入分析 Agent 循环、5 层上下文压缩管道、7 层权限系统、4 种可扩展性机制、子 agent 委托架构以及会话持久化设计。
draft: false
---

# 深入理解 Claude Code 设计原则（二）：核心机制深潜

> 本系列第二篇。上一篇讲了 Claude Code 的整体轮廓和项目背景。这篇拆开引擎盖，看看里面几个关键系统是怎么运转的：Agent 循环、上下文压缩、权限系统、可扩展性机制、子 agent 架构，还有会话持久化。

<!-- truncate -->

> **深入理解 Claude Code 设计原则 · 系列导航**
>
> 01. [项目全局认知与资源导航](./2026-04-26-dive-into-claude-code-01-overview.md)
> 02. [核心机制深潜](./2026-04-26-dive-into-claude-code-02-core-mechanisms.md)
> 03. [设计决策框架](./2026-04-26-dive-into-claude-code-03-design-decisions.md)
> 04. [论文精读与剖析](./2026-04-26-dive-into-claude-code-04-paper-analysis.md)

---

## Agent 查询循环

Claude Code 的 Agent 循环是一个 ReAct 模式的 while 循环。实现上是 `query.ts` 里的一个 `AsyncGenerator`，每个 yield 产出一个流式事件。

<p align="center">
  <img src="/img/dive-into-claude-code/iteration.png" width="60%" alt="运行时轮次流程" />
</p>

每一轮（turn）的执行走一个 9 步管道：

1. 解析当前设置
2. 初始化轮次状态
3. 组装上下文（把系统 prompt、CLAUDE.md、工具元数据、对话历史等拼到一起）
4. 运行 5 层预模型上下文整形器（下一节细说）
5. 调用模型
6. 分派工具调用（从模型返回的结果中提取 tool_use 块）
7. 过权限门控
8. 执行工具
9. 检查停止条件

停止条件有 5 种：模型没有返回任何工具调用（自然结束）；达到最大轮次；上下文窗口溢出；某个钩子主动中止；用户显式终止。

工具执行有两条路径。默认走 `StreamingToolExecutor`，在工具调用从模型流式返回的同时就开始执行，省延迟。如果 streaming 执行遇到问题，退回到 `runTools`，它会先把工具分成并发安全和互斥两类，然后分别处理。

### 故障恢复

这部分的工程量超出你的直觉。

如果模型输出被截断（输出 token 达到上限），系统最多重试 3 次，每次提高 max_output_tokens 的值。如果上下文装不下了，先尝试触发 Context Collapse（后面解释），不行就做一轮反应式压缩，再不行就终止会话。如果流式调用失败，切换到非流式模式。如果当前模型不可用，切换到备用模型。

这些恢复逻辑占了 Agent 循环代码量的相当大一部分。一个简单的 while 循环加上几十种错误处理分支，观感上就不那么"简单"了。

---

## 5 层上下文压缩管道

上下文窗口是整个系统的硬约束。老模型大约 200K token，Claude 4.6 系列大约 1M token。看起来很多，但一个长对话跑下来，加上工具返回的文件内容、编译输出之类的东西，很容易就满了。

所以每次调用模型之前，都会按顺序跑 5 层压缩，从开销最低的开始：

| 层级 | 做什么 | 什么时候触发 |
|:----|:------|:-----------|
| Budget Reduction | 对每条消息设大小上限，超出的截断 | 始终运行 |
| Snip | 裁剪较早的对话历史 | 需要特性标志 `HISTORY_SNIP` 开启 |
| Microcompact | 细粒度压缩，能感知 prompt 缓存边界 | 始终运行。有一个 cache-aware 的可选路径，会避免破坏已缓存的 prompt 前缀 |
| Context Collapse | 读取时的虚拟投影，不修改底层数据 | 需要特性标志 `CONTEXT_COLLAPSE` 开启 |
| Auto-Compact | 用模型生成一份完整摘要来替代历史记录 | 前面 4 层都不够用的时候才触发 |

这个设计有个特别之处：Context Collapse 是非破坏性的。它在读取时对消息进行投影（projection），相当于给模型看一个"缩略版"的历史，但原始数据保留在磁盘上。Auto-Compact 是破坏性的（摘要不可逆），所以放在最后。

"渐进式惰性降级"是论文给这种策略起的名字。先做便宜的，不够再做贵的，尽量推迟那些不可逆的操作。这个思路不限于上下文管理，在权限系统和其他地方也能看到同样的模式。

### 上下文的 9 个来源

<p align="center">
  <img src="/img/dive-into-claude-code/context.png" width="95%" alt="上下文构建" />
</p>

模型看到的上下文由 9 个来源按顺序拼装：

1. 系统 prompt
2. 环境信息（操作系统、工作目录等）
3. CLAUDE.md 层级内容
4. 路径范围的 rules 文件
5. 自动记忆（从记忆文件中检索的内容）
6. 工具元数据（工具描述和参数 schema）
7. 对话历史
8. 工具执行结果
9. 压缩摘要（如果执行过 Auto-Compact）

这里有一个容易被忽略但很重要的设计决策：CLAUDE.md 的内容是作为 **user context** 传给模型的，不是 system prompt。区别在于，system prompt 的遵循是"确定性的"（模型会严格执行），user context 的遵循是"概率性的"（模型可能忽略或偏离）。

为什么这么设计？因为 CLAUDE.md 是用户写的自由文本，内容质量和意图没有保证。如果把它放进 system prompt，等于给了用户通过配置文件注入系统级指令的能力，安全风险太大。所以用 user context 传递，让模型"大概率遵循"但"不保证遵循"，同时用权限规则提供确定性的强制执行层。

### CLAUDE.md 的 4 级层级

| 级别 | 路径 | 谁来管 |
|:----|:-----|:------|
| Managed | `/etc/claude-code/CLAUDE.md` | 系统管理员（企业级场景） |
| User | `~/.claude/CLAUDE.md` | 用户个人偏好 |
| Project | `CLAUDE.md`, `.claude/CLAUDE.md`, `.claude/rules/*.md` | 项目级配置，提交到 git |
| Local | `CLAUDE.local.md` | 个人配置，被 gitignore 忽略 |

更窄范围的配置不会覆盖更宽范围的。四个级别的内容会全部被拼装进上下文。

### 记忆系统

Claude Code 的记忆系统不用向量数据库，不用 embedding。它的做法是让 LLM 扫描记忆文件的文件头（header），然后选出最多 5 个相关文件加载进来。

整个记忆是基于文件的。用户可以直接打开记忆文件查看内容，用编辑器修改，用 git 做版本控制。这种"透明性换检索精度"的取舍在向量数据库流行的今天显得有点逆潮流，但论文认为可审查性比检索质量更重要。

---

## 权限系统

<p align="center">
  <img src="/img/dive-into-claude-code/permission.png" width="75%" alt="权限门控" />
</p>

### 7 种权限模式

Claude Code 的权限模式形成一个渐进式的信任光谱：

| 模式 | 行为 | 信任等级 |
|:----|:-----|:--------|
| `plan` | 用户审批所有计划后才执行 | 最低 |
| `default` | 标准交互式审批 | 低 |
| `acceptEdits` | 文件编辑和文件系统 shell 操作自动批准 | 中 |
| `auto` | ML 分类器评估每个工具调用的安全性 | 高 |
| `dontAsk` | 不弹提示，但 deny 规则仍然生效 | 更高 |
| `bypassPermissions` | 跳过大部分提示，安全关键检查保留 | 最高 |
| `bubble` | 内部使用：子 agent 向父 agent 升级权限 | 特殊 |

从 `plan` 到 `bypassPermissions`，用户逐步把更多决策权交给系统。Anthropic 的纵向使用数据显示，随着用户熟练度提高，自动批准率从约 20% 增长到 40% 以上。

### deny-first 原则

这是权限系统的核心规则：**宽范围的拒绝永远压过窄范围的允许。**

比如你在项目配置里允许了某个工具的某个特定用法，但在用户级配置里拒绝了该工具的所有用法，那么拒绝生效。最严格的规则总是赢。

### 7 层安全防护

一个工具调用请求要通过全部适用的安全层，任何一层都能阻止它：

1. 工具预过滤：被全局拒绝的工具直接从模型视野中移除，模型根本不知道它们的存在
2. deny-first 规则评估
3. 权限模式约束
4. auto 模式 ML 分类器（单独的 LLM 调用）
5. Shell 沙箱（文件系统和网络隔离）
6. 恢复会话时权限不自动恢复
7. PreToolUse 钩子拦截

第 6 条值得展开说。当你恢复一个之前的会话时，Claude Code 不会自动恢复上次的权限状态。每次会话都要重新建立信任。这会造成一些用户摩擦（每次 resume 都要重新批准），但 Anthropic 认为安全不变量不能因为便利性而打折扣。

### auto 模式分类器

auto 模式的实现在 `yoloClassifier.ts`（对，文件名就叫这个）。它是一个单独的 LLM 调用，用内部/外部两套权限模板来评估每个工具调用是否安全。

评估分两步：先做一次快速过滤，过滤掉明显安全的操作（比如读文件）；对剩下的操作做思维链推理来判断。为了不影响延迟，分类器的调用会和主循环的模型调用并行，用超时机制竞争。

### 共享故障模式的问题

论文指出了一个有意思的缺陷。7 层安全防护的思路是"深度防御"，即使一层被突破，其他层还能兜住。但这假设各层的失效模式是独立的。

实际上，Claude Code 的安全层共享一个经济约束：token 成本。auto 模式分类器需要 token 来运行，如果 token 预算紧张，分类质量会下降。更极端的情况是：当一个 shell 命令包含超过 50 个子命令时，逐个子命令的安全分析会让事件循环饥饿，REPL 会卡死。Claude Code 的应对是直接跳过这些超长命令的安全分析。

50 个以上子命令的安全分析被完全绕过。这不是 bug，是为了防止系统挂起的有意决策。但它确实在安全防线上开了一个口子。

### 预信任窗口漏洞

论文分析了 4 个 CVE，其中 2 个共享同一个根因：钩子和 MCP 服务器在初始化阶段就开始执行，这时候信任对话框还没弹出来。也就是说，在用户有机会决定是否信任这些扩展之前，扩展代码已经跑起来了。

这是 deny-first 管道之外的一个结构性特权窗口。已经被修复了，但这个案例说明了一个更普遍的问题：初始化阶段的安全保证往往和稳态运行阶段不一样。

---

## 可扩展性

<p align="center">
  <img src="/img/dive-into-claude-code/extensibility.png" width="85%" alt="三个注入点" />
</p>

Claude Code 的扩展机制有 4 种，按上下文成本从低到高排列。

### 4 种扩展机制

| 机制 | 上下文成本 | 能做什么 |
|:----|:---------|:--------|
| Hooks | 零 | 27 个事件，4 种执行类型（shell、LLM 评估、webhook、子 agent 验证器）。不消耗上下文 token |
| Skills | 低 | SKILL.md 文件加 15 个以上的 YAML frontmatter 字段。通过 SkillTool 元工具注入，只在相关时才加载 |
| Plugins | 中 | 插件清单支持 10 种组件类型：命令、agent、skills、钩子、MCP 服务器、LSP 服务器、输出样式、通道、设置、用户配置 |
| MCP | 高 | 外部工具通过 7 种传输方式接入（stdio、SSE、HTTP、WebSocket、SDK、IDE 等） |

Hooks 零成本的原因是它们运行在 Agent 循环之外，不需要把任何信息塞进上下文窗口。一个 PreToolUse 钩子可以在工具执行前运行一段 shell 脚本做检查，整个过程对上下文完全透明。

### 3 个注入点

Agent 循环有 3 个地方可以被外部代码干预：

- **assemble()** 阶段：决定模型看到什么。可以注入 CLAUDE.md 内容、Skill 描述、MCP 资源描述、钩子注入的上下文
- **model()** 阶段：决定模型能调用什么工具。内置工具、MCP 工具、SkillTool、AgentTool 都在这里注册
- **execute()** 阶段：决定工具调用是否执行以及怎么执行。权限规则、PreToolUse / PostToolUse 钩子、Stop 钩子都在这里起作用

### 工具池组装的 5 步管道

每次会话开始（以及工具集可能变化时），系统用 `assembleToolPool` 函数组装当前可用的工具：

1. 基础枚举：列出最多 54 个内置工具
2. 模式过滤：根据当前权限模式移除不适用的工具
3. deny 预过滤：根据 deny 规则移除被禁止的工具（这些工具从模型视野中完全消失）
4. MCP 集成：加入 MCP 服务器提供的外部工具
5. 去重：处理名称冲突

---

## 子 agent 委托

<p align="center">
  <img src="/img/dive-into-claude-code/subagent.png" width="90%" alt="子 agent 架构" />
</p>

### SkillTool 和 AgentTool

这两个工具都是"元工具"（调用其他工具的工具），但设计意图完全不同。

SkillTool 把 Skill 的指令注入到当前上下文窗口里。开销低，但 Skill 的内容会占用当前会话的上下文空间。适合轻量级的指令注入。

AgentTool 启动一个新的、隔离的上下文窗口。子 agent 在自己的上下文里工作，完成后只把摘要返回给父 agent。开销高（论文提到 agent 团队在 plan 模式下消耗约 7 倍 token），但不会污染父 agent 的上下文。

选择哪个取决于任务。如果你需要给当前对话注入一些指令（"接下来按这个规范写代码"），用 SkillTool。如果你需要让 agent 去做一个独立的调研任务（"去分析这个日志文件然后告诉我结论"），用 AgentTool，因为调研过程中产生的大量中间内容不应该塞进主对话。

### 6 种内置子 agent

Claude Code 内置了 6 种子 agent：Explore（探索代码库）、Plan（制定计划）、General-purpose（通用任务）、Claude Code Guide（使用指南）、Verification（验证）、Statusline-setup（状态栏设置）。

你也可以在 `.claude/agents/*.md` 下定义自定义 agent。YAML frontmatter 支持的配置项包括：tools、disallowedTools、model、effort、permissionMode、mcpServers、hooks、maxTurns、skills、memory scope、background flag、isolation mode。

### 3 种隔离模式

| 模式 | 机制 | 是否默认 |
|:----|:-----|:--------|
| Worktree | Git worktree，文件系统级隔离 | 否 |
| Remote | 远程执行（仅内部使用） | 否 |
| In-process | 共享文件系统，对话隔离 | 是 |

### 侧链和权限继承

每个子 agent 把自己的对话历史写到独立的 `.jsonl` 文件里（侧链）。父 agent 只看到子 agent 返回的摘要，完整历史不会进入父 agent 的上下文。这是防止上下文爆炸的关键设计。

权限方面：子 agent 的 `permissionMode` 生效，除非父 agent 处于 `bypassPermissions`、`acceptEdits` 或 `auto` 模式。也就是说，用户的显式权限决策总是优先于子 agent 的默认设置。

多个子 agent 实例之间用 POSIX `flock()` 做协调。没有引入任何外部依赖，直接用操作系统提供的文件锁。

---

## 会话持久化

<p align="center">
  <img src="/img/dive-into-claude-code/session_compact.png" width="75%" alt="会话持久化与上下文压缩" />
</p>

### 3 个持久化通道

| 通道 | 格式 | 用途 |
|:----|:-----|:-----|
| 会话日志 | Append-only JSONL | 完整对话记录。压缩边界通过 chain patching 记录 |
| 全局 prompt 历史 | `history.jsonl` | 跨会话的 prompt 回调（终端按上箭头时用的） |
| 子 agent 侧链 | 每个子 agent 一个 JSONL 文件 | 隔离的子 agent 历史 |

### Append-only 设计

所有持久化数据都是 append-only 的。不会就地修改磁盘上的文件。Auto-Compact 压缩后，压缩边界通过 `headUuid` / `anchorUuid` / `tailUuid` 记录，会话加载器在读取时重新拼接消息链。原始数据完整保留。

这意味着你可以用文本编辑器打开 JSONL 文件查看完整的对话历史，用 git 追踪变化，必要时手动修复损坏的会话。不需要任何专用工具。

Anthropic 在这里做了一个明确的取舍：审计性和简单性优先于查询能力。JSONL 不适合做复杂查询（比如"找出过去一周所有涉及文件删除的操作"），但它的优势是每条记录都是人类可读的，而且不会出现数据库腐败之类的问题。

### 文件历史检查点

`--rewind-files` 功能的支撑是文件历史检查点，存储在 `~/.claude/file-history/<sessionId>/` 目录下。这让你可以把文件状态回退到对话中的某个时间点。

---

## 把这些机制放在一起看

单独看每个子系统都不算特别复杂。一个 while 循环，一套压缩策略，一个权限检查管道，几种扩展机制。但这些东西组合在一起时，交互变得非常复杂。

举个例子。一个工具调用从模型返回，系统需要：检查这个工具是否被 deny 规则禁止，检查当前权限模式是否允许自动执行，如果是 auto 模式就调用分类器（分类器本身是另一次 LLM 调用，需要管理自己的上下文和 token 预算），运行所有注册的 PreToolUse 钩子，判断钩子是否返回了 `permissionDecision`，如果需要用户批准就弹提示并等待。整个过程中如果上下文快满了，需要触发压缩。如果工具执行失败了，需要走恢复流程。

论文把这种组合复杂度称为"横跨各层的整合机制"，并认为这才是 Claude Code 真正难以复刻的部分。你可以轻松复制一个 while 循环。但要让所有这些子系统正确地协作，在各种边界条件下不出问题，需要的工程量远超想象。

claw-code 用 Rust 把 512K 行压到了约 20K 行，但即使去掉了 96% 的代码，剩下的 20K 行里大部分仍然是这些跨系统的整合逻辑。核心机制的工作量并没有随着语言切换而减少多少。

---

*上一篇：[项目全局认知与资源导航](./2026-04-26-dive-into-claude-code-01-overview.md)*
*下一篇：[设计决策框架](./2026-04-26-dive-into-claude-code-03-design-decisions.md)*
