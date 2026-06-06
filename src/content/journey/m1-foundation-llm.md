---
month: "M1"
title: "Foundation — LLM + AI Coding"
status: "done"
description: "Built the LLM fundamentals + AI-augmented engineering muscle."
outputs:
  - "LLM model comparison report"
  - "AI Coding bug-pattern notebook"
order: 1
---

## What I shipped

Used Python to call 3+ LLM APIs (OpenAI, Anthropic, MiniMax) and wrote structured prompt
templates I still reuse. Finished a 1-page comparison report of M2.5 / GPT-4o / Claude 3.7 /
DeepSeek capability boundaries. With Cursor + Claude Code I built a TODO API from scratch
end-to-end — the point wasn't the code, it was writing the PRD first and reviewing
1000 lines of AI output for race conditions and broken error handling.

## What I learned

- Prompt engineering is mostly about **clarifying the request**, not clever phrasing
- 5-line requirements vs 50-line PRDs → AI output quality differs by ~10x
- Reviewing AI code is a real skill — I found 3-5 bugs per project in pattern types
  (sync/async, swallowed exceptions, N+1 queries)
