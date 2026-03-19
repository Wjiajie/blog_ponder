import React from 'react';
import Layout from '@theme/Layout';
import styles from './about.module.css';

export default function AboutPage(): JSX.Element {
  return (
    <Layout
      title="关于"
      description="关于 Jiajie Wu - 图形图像工程师，对软件构建、心智模型感兴趣">
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>关于我</h1>
          <p className={styles.tagline}>一名崭新水手，在知识的海洋中探索</p>
        </header>

        <section className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>简介</h2>
            <p className={styles.paragraph}>
              我是 Jiajie Wu，一名图形图像工程师。对软件构建、心智模型有着浓厚的兴趣。
            </p>
            <p className={styles.paragraph}>
              这个博客是我的思考空间，记录着我在技术、生活、阅读中的所见所想。
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>探索路线图</h2>
            <p className={styles.paragraph}>
              我正在构建一个系统，培养自己和更多人对太空探索的兴趣。这是我的旅程节点：
            </p>
            <div className={styles.roadmap}>
              <div className={`${styles.roadmapNode} ${styles.roadmapNodeActive}`}>
                <div className={styles.roadmapDot} />
                <div className={styles.roadmapContent}>
                  <span className={styles.roadmapDate}>2026.03</span>
                  <a href="/blog/future-plan-review" className={styles.roadmapTitle}>
                    复盘与未来计划：把注意力投向太空
                  </a>
                  <p className={styles.roadmapDesc}>
                    确立使命、制定阶段路线图、搭建知识库与工具系统
                  </p>
                </div>
              </div>
              <div className={`${styles.roadmapNode} ${styles.roadmapNodeUpcoming}`}>
                <div className={styles.roadmapDot} />
                <div className={styles.roadmapContent}>
                  <span className={styles.roadmapDate}>阶段零</span>
                  <span className={styles.roadmapTitle}>自我培养期</span>
                  <p className={styles.roadmapDesc}>
                    深度学习太空基础学科，构建知识库，积累受众基础
                  </p>
                </div>
              </div>
              <div className={`${styles.roadmapNode} ${styles.roadmapNodeUpcoming}`}>
                <div className={styles.roadmapDot} />
                <div className={styles.roadmapContent}>
                  <span className={styles.roadmapDate}>阶段一</span>
                  <span className={styles.roadmapTitle}>全力探索期</span>
                  <p className={styles.roadmapDesc}>
                    从学习者到创作者，寻找可持续的商业模式
                  </p>
                </div>
              </div>
              <div className={`${styles.roadmapNode} ${styles.roadmapNodeUpcoming}`}>
                <div className={styles.roadmapDot} />
                <div className={styles.roadmapContent}>
                  <span className={styles.roadmapDate}>阶段二</span>
                  <span className={styles.roadmapTitle}>亲子太空时代</span>
                  <p className={styles.roadmapDesc}>
                    带着孩子一起探索宇宙，构建可复用的教育系统
                  </p>
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
