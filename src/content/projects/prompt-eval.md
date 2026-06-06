---
title: "Prompt Eval Harness"
summary: "A small eval harness for grading LLM prompts against a fixed test set. Compares prompt revisions, tracks regressions, and renders a side-by-side diff of outputs. Built to iterate on the AI tutor prompt pipeline."
status: "planning"
category: "Side"
stack: ["Python", "DuckDB", "Streamlit", "LiteLLM"]
links:
  repo: "https://github.com/wjiajie/prompt-eval"
order: 3
---

A small tool for grading LLM prompts. The workflow:

1. Write a test set as YAML — input, expected behavior, rubric.
2. Run a prompt against every test case, capture the outputs.
3. Grade outputs with a judge LLM (or a heuristic).
4. Render a side-by-side diff between two prompt revisions.

Built to support the AI tutor MVP. The prompt iteration loop — "does this revision help with the misconception surfacing?" — needs a regression test harness, not vibes.

## Status

Planning. Will be built in M3 once the AI tutor prompt reaches a stable baseline.
