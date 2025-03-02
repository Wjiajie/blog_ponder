import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function DataFormatConversion(): JSX.Element {
  return (
    <Layout
      title="数据格式转换"
      description="各种数据格式之间的转换方法与工具">
      <main className="container margin-vert--lg">
        <Link to="/notes/tools-usage" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回工具使用
        </Link>
        <h1>数据格式转换</h1>
        <div className={styles.content}>
          <ul>
            <li>
              <Link to="/blog/wepub-covert-web-to-book">使用Wepub将网页优雅地转换为电子书</Link>
              <p className={styles.description}>一个强大的网页转电子书工具，支持多种格式导出，包括HTML、PDF、EPUB和Markdown，方便阅读和笔记。</p>
            </li>
            <li>
              <Link to="/blog/wepub-add-rss">wepub增加RSS源模式</Link>
              <p className={styles.description}>wepub新增的RSS源模式功能，支持从RSS源批量抓取文章并转换为电子书，同时优化了导出功能和抓取限制。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 