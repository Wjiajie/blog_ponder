import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

export default function Life(): JSX.Element {
  return (
    <Layout
      title="生活随笔"
      description="日常感悟、记录的生活随笔">
      <main className="container margin-vert--lg">
        <h1>生活随笔</h1>
        <div className={styles.content}>
          <p>这里将会是生活相关的随笔内容...</p>
        </div>
      </main>
    </Layout>
  );
} 