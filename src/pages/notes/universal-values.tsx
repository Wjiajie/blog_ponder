import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function UniversalValues(): JSX.Element {
  return (
    <Layout
      title="通用价值"
      description="跨领域的通用价值观念与思想">
      <main className="container margin-vert--lg">
        <Link to="/index" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回笔记索引
        </Link>
        <h1>通用价值</h1>
        <div className={styles.content}>
          <div className={styles.subCategories}>
            <div className={styles.subCategory}>
              <Link to="/notes/mental-models" className={styles.subCategoryLink}>
                <i className="fas fa-brain"></i>
                <span>思维模型</span>
              </Link>
              <p>介绍各种思维模型、决策框架与认知工具，帮助你构建更全面的思考方式和解决问题的能力。</p>
            </div>
            
            <div className={styles.subCategory}>
              <Link to="/notes/money-philosophy" className={styles.subCategoryLink}>
                <i className="fas fa-money-bill-wave"></i>
                <span>金钱观</span>
              </Link>
              <p>探讨关于金钱的哲学思考、理财原则与投资理念，建立健康的财富观念和经济独立的路径。</p>
            </div>
            
            <div className={styles.subCategory}>
              <Link to="/notes/entrepreneurship" className={styles.subCategoryLink}>
                <i className="fas fa-rocket"></i>
                <span>创业</span>
              </Link>
              <p>分享创业经验、思考与实践指南，包括商业模式、团队建设、产品开发等创业全过程的关键环节。</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 