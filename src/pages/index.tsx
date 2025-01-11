import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout
      noFooter={true}
      description="A simple blog for thoughts and ideas">
      <div className={styles.pageContainer}>
        <main className={styles.heroBanner}>
          <h1 className={styles.title}>ponder</h1>
          <p className={styles.subtitle}>keep thinking, keep simple.</p>
          <Link
            to="/blog"
            className={styles.enterButton}>
            Enter
          </Link>
        </main>
      </div>
    </Layout>
  );
}
