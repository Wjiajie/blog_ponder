import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function SoftwareArchitecture(): JSX.Element {
  return (
    <Layout
      title="软件架构"
      description="软件架构设计原则、模式与最佳实践">
      <main className="container margin-vert--lg">
        <Link to="/notes/computer-science" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回计算机科学
        </Link>
        <h1>软件架构</h1>
        <div className={styles.content}>
          <h2>设计原则与模式</h2>
          <ul>
            <li>
              <Link to="/blog/solid-intro">软件构建中层结构的设计原则--SOLID</Link>
              <p className={styles.description}>SOLID是五条原则的英文首字母拼接，这五条原则指的是：单一职责原则、开闭原则、里氏替换原则、接口隔离原则和依赖反转原则。</p>
            </li>
            <li>
              <Link to="/blog/cpp-design-pattern">C++常用设计模式</Link>
              <p className={styles.description}>本文介绍了C++设计模式的六大原则，包括单一职责、里氏替换、依赖倒置、接口隔离、迪米特法则和开放封闭原则，并对常用的设计模式进行分类讲解。</p>
            </li>
          </ul>

          <h2>神经网络架构</h2>
          <ul>
            <li>
              <Link to="/blog/transformer-intro">Transformer简介</Link>
              <p className={styles.description}>Transformer是谷歌在2017年提出的一种基于注意力机制的神经网络架构，它在自然语言处理（NLP）领域取得了显著的成果，并逐渐在计算机视觉（CV）领域展现出强大的潜力。</p>
            </li>
            <li>
              <Link to="/blog/swin-transformer-sum">Swin Transformer总结</Link>
              <p className={styles.description}>Swin Transformer是一种针对计算机视觉任务优化的Transformer变体，解决了传统Transformer在处理图像时面临的尺度问题和计算复杂度问题。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 