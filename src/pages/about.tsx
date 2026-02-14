import React from 'react';
import Layout from '@theme/Layout';
import styles from './about.module.css';

export default function AboutPage(): JSX.Element {
  return (
    <Layout
      title="关于"
      description="关于 Jiajie Wu - 图形图像工程师，对编码、软件构建、心智模型感兴趣">
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>关于我</h1>
          <p className={styles.tagline}>一名崭新水手，在知识的海洋中探索</p>
        </header>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>简介</h2>
            <p className={styles.paragraph}>
              我是 Jiajie Wu，一名图形图像工程师。对编码、软件构建、心智模型有着浓厚的兴趣。
              长期爱好是阅读和写作，相信文字的力量可以记录思考、沉淀认知。
            </p>
            <p className={styles.paragraph}>
              这个博客是我的思考空间，记录着我在技术、生活、阅读中的所见所想。
              正如博客的名字 "ponder" 所示，这里是我沉思的地方。
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>写作主题</h2>
            <div className={styles.interests}>
              <div className={styles.interestItem}>
                <span className={styles.interestIcon}>🏗️</span>
                <div className={styles.interestContent}>
                  <h3>软件架构</h3>
                  <p>SOLID 原则、设计模式、系统设计、Nanobot 项目系列</p>
                </div>
              </div>
              <div className={styles.interestItem}>
                <span className={styles.interestIcon}>🧠</span>
                <div className={styles.interestContent}>
                  <h3>决策与思维</h3>
                  <p>思维模型、职业选择、思考框架、认知升级</p>
                </div>
              </div>
              <div className={styles.interestItem}>
                <span className={styles.interestIcon}>📚</span>
                <div className={styles.interestContent}>
                  <h3>阅读与写作</h3>
                  <p>读书笔记、写作方法、学习心得、知识管理</p>
                </div>
              </div>
              <div className={styles.interestItem}>
                <span className={styles.interestIcon}>🤖</span>
                <div className={styles.interestContent}>
                  <h3>AI 技术</h3>
                  <p>RAG、LLM、Transformer、神经网络架构</p>
                </div>
              </div>
              <div className={styles.interestItem}>
                <span className={styles.interestIcon}>💻</span>
                <div className={styles.interestContent}>
                  <h3>编程语言</h3>
                  <p>C++ 深度探索、智能指针、移动语义、现代特性</p>
                </div>
              </div>
              <div className={styles.interestItem}>
                <span className={styles.interestIcon}>💰</span>
                <div className={styles.interestContent}>
                  <h3>财富哲学</h3>
                  <p>金钱观、财富积累、个人成长</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>联系方式</h2>
            <div className={styles.links}>
              <a href="https://github.com/Wjiajie" className={styles.link} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://jike.city/jiajiewu_ponder" className={styles.link} target="_blank" rel="noopener noreferrer">
                Jike
              </a>
              <a href="mailto:jiajiewu233@gmail.com" className={styles.link}>
                Email
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>关于本站</h2>
            <p className={styles.paragraph}>
              本站使用 <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a> 构建，
              部署在 <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">Vercel</a>。
              设计风格追求简洁、禅意，希望为读者提供舒适的阅读体验。
            </p>
            <p className={styles.paragraph}>
              博客内容采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a> 许可协议，
              欢迎转载分享，但请注明出处。
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
