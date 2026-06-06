---
title: "AI Tutor MVP for High-School Physics"
summary: "An education-focused chatbot that walks students through high-school physics problems with Socratic prompting, concept breakdown, and misconception surfacing. Built end-to-end as the FDE capstone deliverable."
status: "in-progress"
category: "Education"
stack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "OpenAI API", "Langfuse"]
links:
  post: "/blog/fde-journey-roadmap/"
order: 1
---

The capstone project for the FDE prep track. A working AI tutor that a real teacher can drop into a class next week — not a notebook demo.

The product asks "what is the student actually confused about?" before answering. Each response runs through three layers:

1. **Misconception detection** — classify the student's input against common physics misconceptions (force-velocity confusion, current-voltage confusion, heat-temperature confusion). Surface the misconception to the student explicitly.
2. **Socratic prompting** — if the student asks a direct question, the tutor first asks a follow-up that scaffolds the student to the next step. No direct answers unless the student explicitly asks for one.
3. **Concept graph traversal** — track which concepts the student has hit, which they have not, and which prerequisite is missing. Generate the next question from the prerequisite gap.

Built on FastAPI + PostgreSQL + Next.js. The observation pipeline streams every tutor-student exchange into Langfuse for grading and prompt iteration.

## Why this matters for FDE

The deliverable is not "a chatbot that works in my notebook." The deliverable is a system a school can deploy without an ML engineer on staff. The whole FDE interview loop runs on this kind of artifact: ambiguity, integration, observability, iteration, hand-off.
