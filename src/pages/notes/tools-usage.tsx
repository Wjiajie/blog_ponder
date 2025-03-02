import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function ToolsUsage(): JSX.Element {
  return (
    <Layout
      title="工具使用"
      description="各类工具的使用技巧与最佳实践">
      <main className="container margin-vert--lg">
        <Link to="/index" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回笔记索引
        </Link>
        <h1>工具使用</h1>
        <div className={styles.content}>
          <div className={styles.subCategories}>
            <div className={styles.subCategory}>
              <Link to="/notes/rag" className={styles.subCategoryLink}>
                <i className="fas fa-database"></i>
                <span>RAG</span>
              </Link>
              <p>检索增强生成技术的原理与应用，探讨如何结合大型语言模型和知识库构建更智能的系统。</p>
            </div>
            
            <div className={styles.subCategory}>
              <Link to="/notes/data-format-conversion" className={styles.subCategoryLink}>
                <i className="fas fa-exchange-alt"></i>
                <span>数据格式转换</span>
              </Link>
              <p>介绍各种数据格式之间的转换方法与工具，解决不同系统间数据交换的实际问题。</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 