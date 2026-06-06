---
month: "M3"
title: "Core — Agent + Evaluation"
status: "in-progress"
description: "Going deep on LangGraph agents, MCP, and RAGAS evaluation."
outputs:
  - "Multi-agent teaching assistant"
  - "RAGAS evaluation report"
order: 3
---

## What I'm shipping this month

A multi-step agent with tool calling, memory, and sub-task decomposition. Custom MCP
server for my own tools. RAGAS-based evaluation report on the M2/W9 work with accuracy,
hallucination rate, and token cost.

## What I expect to learn

- **ReAct vs Plan-and-Execute** — when to use which (and why Plan-and-Execute is almost
  always better for production)
- MCP as the "USB-C for LLM tools" — building one teaches you more than using ten
- Evaluation is the **first** thing, not the last — bake it into every project
