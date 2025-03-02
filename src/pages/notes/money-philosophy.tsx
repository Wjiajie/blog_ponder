import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function MoneyPhilosophy(): JSX.Element {
  return (
    <Layout
      title="金钱观"
      description="关于金钱的哲学思考、理财原则与投资理念">
      <main className="container margin-vert--lg">
        <Link to="/notes/universal-values" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回通用价值
        </Link>
        <h1>金钱观</h1>
        <div className={styles.content}>
          <ul>
            <li>
              <Link to="/blog/money-psychology">读《金钱心理学》</Link>
              <p className={styles.description}>金钱心理学这本书不讲投资建议和公式计算，作者投资的目的不是追求最佳受益，而是追求自主性，对作者来说，自主性并不意味着不再工作，而是意味着可以在自己喜欢的时间里和喜欢的人做喜欢的工作，想做多久就做多久。</p>
            </li>
            <li>
              <Link to="/blog/relationship-with-money-trans">【译】金钱是身份的放大器</Link>
              <p className={styles.description}>本文探讨了我们与金钱的复杂关系。作者通过个人经历和对金钱光谱的分析，揭示了金钱如何放大我们的身份认同和价值观。文章指出，我们对金钱的态度会随着人生阶段的变化而改变，从生存需求到追求安全感，再到实现更高层次的目标。</p>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/blog/nathanbarry-wealth-creation">【译】财富创造的阶梯：逐步积累财富的路线图</Link>
              <p className={styles.description}>本文是一篇关于个人如何通过不同的阶段和策略来增加收入和积累财富的文章。作者通过分享自己的经历和一些原则，为读者提供了一个积累财富的路线图。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 