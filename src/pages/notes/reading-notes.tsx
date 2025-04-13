import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function ReadingNotes(): JSX.Element {
  return (
    <Layout
      title="读书杂谈"
      description="读书心得、书评与阅读方法">
      <main className="container margin-vert--lg">
        <Link to="/notes/life" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回生活随笔
        </Link>
        <h1>读书杂谈</h1>
        <div className={styles.content}>
          <ul>
            <li>
              <Link to="/blog/my-read-note-write_pipeline">我的阅读、笔记、写作流程构建记录</Link>
              <p className={styles.description}>这篇文章主要受到最近两个月的一本地铁读物—《卡片笔记写作法》的影响而诞生，我想记录阅读这本书的一些收获，以及参考它的做法搭建的一套写作流程。</p>
            </li>
            <li>
              <Link to="/blog/information-cocoon-self-rescue-guide">【译】信息茧房自救指南</Link>
              <p className={styles.description}>在信息爆炸的时代，如何突破信息茧房的束缚？本文从内容冲击、信息茧房、注意力分散和FOMO等四个维度剖析信息末日的挑战，并提供三个实用的解决方案：识别突破性知识、寻找高价值信息格式以及掌握学习方法，帮助读者在信息洪流中找到真正有价值的知识。</p>
            </li>
            <li>
              <Link to="/blog/markdown-syntax-guide">Markdown 语法指南</Link>
              <p className={styles.description}>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的 HTML 文档。本文将系统地总结 Markdown 的各种语法用法，帮助你更好地掌握这个强大的文档编写工具。</p>
            </li>
            <li>
              <Link to="/blog/intro-fs-blog">高质量信息源推荐-Farnam Street</Link>
              <p className={styles.description}>介绍一个高质量的信息源Farnam Street博客，包括其播客、实体书和文章板块的内容介绍。</p>
            </li>
            <li>
              <Link to="/blog/writes-and-write-nots">【译】好作家和不会写作的人</Link>
              <p className={styles.description}>本文探讨了写作在未来的变化，特别是随着AI的发展，写作技能的分化以及其对思维能力的影响。</p>
            </li>
            <li>
                <Link to="/blog/you-and-your-research">【译】你和你的研究</Link>
                <p className={styles.description}>本文是理查德·汉明（Richard Hamming）在1986年的一次演讲，他分享了关于科研的七个条件，以及如何成为一个优秀的科研工作者。</p>
            </li>
            <li>
              <Link to="/blog/atomic-habits-reading-notes">《原子习惯》读书笔记</Link>
              <p className={styles.description}>《原子习惯》是一本教你通过积累微小习惯实现个人蜕变的实用指南。作者詹姆斯・克利尔提出，习惯是自我提升的复利，通过 “四大定律”—— 让习惯显而易见、有吸引力、简便易行、令人愉悦，能系统地建立好习惯、破除坏习惯。书中结合大量案例（如英国自行车队通过 1% 的边际改进夺冠、普通人通过身份认同重塑习惯等），阐明习惯如何塑造身份，以及如何通过环境设计、社会影响、即时反馈等策略让习惯自然发生。这本书适用于个人成长、职场提升、健康管理等多个领域，适合所有希望通过持续微小改变实现长期目标的读者，尤其适合那些厌倦了 “三分钟热度”、想找到科学方法坚持习惯的人。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 