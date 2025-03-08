import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function BrainScience(): JSX.Element {
  return (
    <Layout
      title="脑科学"
      description="脑科学基础知识、理论与实践">
      <main className="container margin-vert--lg">
        <Link to="/notes/general-knowledge" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回泛领域知识
        </Link>
        <h1>脑科学</h1>
        <div className={styles.content}>
          <h2>论文速读</h2>
          <ul>
            <li>
              <Link to="/blog/the-minicolumn-hypothesis-in-neuroscience-intro">【论文概要】The minicolumn hypothesis in neuroscience</Link>
              <p className={styles.description}>本文系统综述了微柱作为皮层组织基本单位的解剖、生理及功能特性，强调其异质性和动态性在神经可塑性和疾病中的潜在作用。尽管微柱理论仍存在争议，但其为理解皮层功能提供了跨学科框架，未来需结合多技术手段深入研究其发育机制与疾病关联。</p>
            </li>
            <li>
              <Link to="/blog/functional-maps-of-neocortical-local-circuitry-intro">【论文概要】Functional Maps of Neocortical Local Circuitry</Link>
              <p className={styles.description}>本文旨在整合多种技术手段的数据，构建新皮层局部电路的功能连接图谱，为理论建模提供数值依据。研究方法包括解剖学研究、配对细胞内和全细胞记录技术，以及其他补充技术如笼状谷氨酸光解和电压敏感染料等。文章详细分类了新皮层中的兴奋性神经元和抑制性中间神经元，分析了它们的连接模式和突触特性。研究发现新皮层局部电路存在高度选择性的连接模式，抑制性中间神经元通过靶向特异性调控网络动态。尽管部分连接数据稀疏，跨物种和年龄的比较存在差异，但本文为理解新皮层功能模块化提供了重要的结构解释。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 