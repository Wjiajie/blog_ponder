import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function ComputerScience(): JSX.Element {
  return (
    <Layout
      title="计算机科学"
      description="计算机科学基础知识、理论与实践">
      <main className="container margin-vert--lg">
        <Link to="/index" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回笔记索引
        </Link>
        <h1>计算机科学</h1>
        <div className={styles.content}>
          <div className={styles.subCategories}>
            <div className={styles.subCategory}>
              <Link to="/notes/software-architecture" className={styles.subCategoryLink}>
                <i className="fas fa-sitemap"></i>
                <span>软件架构</span>
              </Link>
              <p>探讨软件架构设计原则、模式与最佳实践，帮助开发者构建可扩展、可维护的系统。</p>
            </div>
            
            <div className={styles.subCategory}>
              <Link to="/notes/programming-languages" className={styles.subCategoryLink}>
                <i className="fas fa-code"></i>
                <span>编程语言</span>
              </Link>
              <p>介绍各种编程语言的特性、用法与最佳实践，包括语言设计理念和实际应用案例。</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 