import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 设置加载完成状态，因为不再需要预加载背景图片
    setIsLoaded(true);
  }, []);

  return (
    <Layout
      noFooter={true}
      description="A simple blog for thoughts and ideas">
      <div className={clsx(styles.pageContainer, isLoaded && styles.loaded)}>
        <main className={styles.heroBanner}>
          <h1 className={clsx(styles.title, styles.artisticTitle)}>ponder</h1>
          <p className={styles.subtitle}>You become what you believe.</p>
          <a href="/blog" className={styles.enterButton}>
            ENTER
          </a>
        </main>
      </div>
    </Layout>
  );
}
