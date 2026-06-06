---
month: "M2"
title: "Foundation — RAG + Frontend"
status: "done"
description: "Shipped a RAG question-answering web app end-to-end."
outputs:
  - "RAG web app on MiniMax / OpenAI APIs"
order: 2
---

## What I shipped

Built a RAG Q&A bot over local docs using LangChain + LlamaIndex. Upgraded to hybrid
retrieval (BM25 + dense embeddings + BGE-M3 reranker) and shipped a Streamlit Web UI.
Containerized with Docker, deployed to Aliyun with GitHub Actions CI/CD.

## What I learned

- **Hybrid retrieval > pure dense** for Chinese content (BM25 catches exact terms that
  embeddings miss)
- Streamlit is the right choice for "good enough" UI — Next.js is overkill when
  you're shipping the AI, not the front-end
- RAGAS gives you a number, but **teacher feedback gives you the truth**
