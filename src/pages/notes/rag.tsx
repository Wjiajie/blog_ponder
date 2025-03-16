import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function RAG(): JSX.Element {
  return (
    <Layout
      title="RAG"
      description="检索增强生成技术的原理与应用">
      <main className="container margin-vert--lg">
        <Link to="/notes/tools-usage" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回工具使用
        </Link>
        <h1>RAG</h1>
        <div className={styles.content}>
        <ul>
            <li>
              <Link to="/blog/my-rag-learning-road-map">我的RAG学习路线图</Link>
              <p className={styles.description}>这篇文章主要记录了我在学习RAG的过程中，从零开始搭建RAG系统的历程。</p>
            </li>
            <li>
              <Link to="/blog/how-to-start-learn-rag-with-llmware">如何使用llmware开始学习RAG</Link>
              <p className={styles.description}>这篇文章主要记录了我在学习RAG的过程中，从零开始搭建RAG系统的历程。</p>
            </li>
            <li>
              <Link to="/blog/llmware-create-first-library">使用llmware创建第一个知识库</Link>
              <p className={styles.description}>本文介绍了如何使用llmware库创建第一个知识库，包括文档解析、分块、索引和基本查询的步骤。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 