import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 预加载背景图片
    const img = new Image();
    img.src = 'https://s2.loli.net/2025/01/11/FmGaWUwTCOlNLXg.jpg';
    img.onload = () => {
      setIsLoaded(true);
    };
  }, []);

  return (
    <Layout
      noFooter={true}
      description="A simple blog for thoughts and ideas">
      <div className={clsx(styles.pageContainer, isLoaded && styles.loaded)}>
        <main className={styles.heroBanner}>
          <h1 className={styles.title}>ponder</h1>
          <p className={styles.subtitle}>keep thinking, keep simple.</p>
          <a href="/blog" className={styles.enterButton}>
            ENTER
          </a>
        </main>
      </div>
    </Layout>
  );
}
