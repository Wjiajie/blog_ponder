import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

export default function UtterancesComments(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const utterancesRef = useRef<HTMLScriptElement | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const createUtterancesEl = () => {
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.setAttribute('repo', 'Wjiajie/meme-blog-comments'); // 替换为你的 GitHub 仓库
      script.setAttribute('issue-term', 'pathname');
      script.setAttribute('label', '💬 comments');
      script.setAttribute('theme', colorMode === 'dark' ? 'github-dark' : 'github-light');
      script.crossOrigin = 'anonymous';
      script.async = true;
      
      utterancesRef.current = script;
      containerRef.current?.appendChild(script);
    };

    // 移除现有评论区
    const utterancesEl = utterancesRef.current;
    if (utterancesEl) {
      utterancesEl.remove();
    }
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    createUtterancesEl();

    return () => {
      if (utterancesRef.current) {
        utterancesRef.current.remove();
      }
    };
  }, [colorMode]);

  return (
    <div className={styles.commentsContainer} ref={containerRef}>
      <h3 className={styles.title}>评论</h3>
    </div>
  );
} 