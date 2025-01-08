import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

export default function Reading(): JSX.Element {
  return (
    <Layout
      title="阅读笔记"
      description="书籍摘要、思考的阅读笔记">
      <main className="container margin-vert--lg">
        <h1>阅读笔记</h1>
        <div className={styles.content}>
          <p>这里将会是阅读相关的笔记内容...</p>
        </div>
      </main>
    </Layout>
  );
} 