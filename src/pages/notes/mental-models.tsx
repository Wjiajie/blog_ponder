import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function MentalModels(): JSX.Element {
  return (
    <Layout
      title="思维模型"
      description="各种思维模型、决策框架与认知工具">
      <main className="container margin-vert--lg">
        <Link to="/notes/universal-values" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回通用价值
        </Link>
        <h1>思维模型</h1>
        <div className={styles.content}>
          <ul>
            <li>
              <Link to="/blog/the-map-is-not-the-territory">思维模型-地图不是领土</Link>
              <p className={styles.description}>本文介绍了'地图不是领土'这一思维模型的核心概念，探讨了认知模型与现实之间的差异，以及如何正确理解和应用思维模型来更好地理解复杂的现实世界。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 