import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function UtterancesComments(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const utterancesRef = useRef<HTMLScriptElement | null>(null);
  const { colorMode } = useColorMode();
  const { siteConfig } = useDocusaurusContext();
  
  const utterancesConfig = (siteConfig.themeConfig?.comments as any)?.utterances;

  // 如果评论系统被禁用，返回空组件
  if (!utterancesConfig?.enabled) {
    return null;
  }

  useEffect(() => {
    const createUtterancesEl = () => {
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.setAttribute('repo', utterancesConfig.repo);
      script.setAttribute('issue-term', 'pathname');
      script.setAttribute('label', utterancesConfig.label);
      script.setAttribute(
        'theme',
        colorMode === 'dark' 
          ? utterancesConfig.theme.dark 
          : utterancesConfig.theme.light
      );
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
  }, [colorMode, utterancesConfig]);

  return (
    <div className={styles.commentsContainer} ref={containerRef}>
      <h3 className={styles.title}>评论</h3>
    </div>
  );
} 