import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

export default function Programming(): JSX.Element {
  return (
    <Layout
      title="编程笔记"
      description="开发技术、最佳实践的学习笔记">
      <main className="container margin-vert--lg">
        <h1>编程笔记</h1>
        <div className={styles.content}>
          <p>这里将会是编程相关的笔记内容...</p>
        </div>
      </main>
    </Layout>
  );
} 