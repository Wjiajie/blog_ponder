import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function Life(): JSX.Element {
  return (
    <Layout
      title="生活随笔"
      description="日常感悟、记录的生活随笔">
      <main className="container margin-vert--lg">
        <Link to="/index" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回笔记索引
        </Link>
        <h1>生活随笔</h1>
        <div className={styles.content}>
          <div className={styles.subCategories}>
            <div className={styles.subCategory}>
              <Link to="/notes/reading-notes" className={styles.subCategoryLink}>
                <i className="fas fa-book-reader"></i>
                <span>读书杂谈</span>
              </Link>
              <p>分享读书心得、书评与阅读方法，探讨如何通过阅读拓展视野、获取知识和提升思考能力。</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 