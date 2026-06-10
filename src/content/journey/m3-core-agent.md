---
month: "M3"
title: "核心期 · Agent 与评估"
status: "upcoming"
description: "深入 Agent 框架、评估体系和 MCP 协议。"
outputs:
  - "多步 Agent 项目（带工具调用、记忆、子任务分解）"
  - "自定义 MCP Server"
  - "RAGAS 评估报告"
  - "Multi-Agent 协作系统"
order: 3
---

## 这个月要做什么

第 9 周：Agent 框架深入——用 LangGraph 或 Dify 搭一个多步 Agent（带工具调用、记忆、子任务分解）。

第 10 周：MCP 协议实战——实现一个自定义 MCP Server，让 LLM 能调用我自己的工具。

第 11 周：LLM 评估体系——用 RAGAS + 自建评测集，对 M2/W9 的项目做完整评估报告（准确率、幻觉率、Token 成本）。

第 12 周：多智能体协作——实现一个简单的 Multi-Agent 系统（例如：教学 Agent + 评估 Agent + 修订 Agent）。

## 这个月要建立的能力

- ReAct / Plan-and-Execute / Reflection / Multi-Agent 的取舍判断
- 评估先行：每个 Agent 项目自带评测集 + 量化结果
- MCP 作为「LLM 工具的 USB-C」：能自己写 Server、也能接外部 Server
