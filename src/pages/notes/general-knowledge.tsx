import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function GeneralKnowledge(): JSX.Element {
  return (
    <Layout
      title="泛领域知识"
      description="泛领域知识基础知识、理论与实践">
      <main className="container margin-vert--lg">
        <Link to="/index" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回笔记索引
        </Link>
        <h1>泛领域知识</h1>
        <div className={styles.content}>
          <div className={styles.subCategories}>
            <div className={styles.subCategory}>
              <Link to="/notes/brain-science" className={styles.subCategoryLink}>
                <i className="fas fa-brain"></i>
                <span>脑科学</span>
              </Link>
              <p>介绍脑科学的基础知识、理论与实践，帮助开发者构建可扩展、可维护的系统。</p>
            </div>
            
          </div>
        </div>
      </main>
    </Layout>
  );
} 