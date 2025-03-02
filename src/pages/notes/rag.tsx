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
        </div>
      </main>
    </Layout>
  );
} 