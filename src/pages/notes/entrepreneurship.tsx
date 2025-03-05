import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function Entrepreneurship(): JSX.Element {
  return (
    <Layout
      title="创业"
      description="创业经验、思考与实践指南">
      <main className="container margin-vert--lg">
        <Link to="/notes/universal-values" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回通用价值
        </Link>
        <h1>创业</h1>
        <div className={styles.content}>
          <ul>
            <li>
              <Link to="/blog/how-to-start-google">【译】如何启动google</Link>
              <p className={styles.description}>这篇文章是Paul Graham在2024年3月给14至15岁青少年的一场演讲，主题是如何开始创业。文章强调了一个观点：避免传统就业的最佳方式是创办自己的公司。文章中提到，成功的创业需要三个要素：精通某项技术、有一个要构建的产品或服务的想法，以及至少一个合伙人。</p>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/blog/how-to-pick-a-career">【译】Tim Urban：如何选择真正适合你的职业？</Link>
              <p className={styles.description}>很多人在临终时回溯自己的一生，都充满着深深的后悔。很多后悔来自于童年，大部分人小时候并没有机会学习如何创造自己的路径。并且大多数人成年后依然不会创造自己的路径，所以才会在临终回顾时发现自己所走的路有多么荒诞。</p>
            </li>
            <li>
              <Link to="/blog/think-for-ourself">【译】如何为自己思考</Link>
              <p className={styles.description}>文章主要探讨了独立思考的重要性及其在不同职业领域中的表现。作者指出，某些工作领域（如科学研究、投资、创业等）要求个体不仅要有正确的观点，还要有新颖的见解，这需要与他人持有不同的思维方式。</p>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/blog/designers-taste">【译】设计者的品味</Link>
              <p className={styles.description}>Paul Graham 深入探讨设计者的品味：什么是好的设计？为什么简单的设计往往是最好的？如何培养设计品味？本文将揭示跨越数学、艺术、建筑等领域的通用设计原则。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 