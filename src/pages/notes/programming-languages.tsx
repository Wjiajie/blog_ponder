import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function ProgrammingLanguages(): JSX.Element {
  return (
    <Layout
      title="编程语言"
      description="各种编程语言的特性、用法与最佳实践">
      <main className="container margin-vert--lg">
        <Link to="/notes/computer-science" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i> 返回计算机科学
        </Link>
        <h1>编程语言</h1>
        <div className={styles.content}>
          <h2>C++</h2>
          <ul>
            <li>
              <Link to="/blog/lvalue-rvalue-move-semantics">一文简介C++左/右值引用以及移动语义</Link>
              <p className={styles.description}>C++中的左值引用（lvalue reference）和右值引用（rvalue reference），以及移动语义（move semantics），都是为了提高程序性能和效率而设计的语言特性。</p>
            </li>
            <li>
              <Link to="/blog/cpp-smart-pointer">一文简介C++智能指针</Link>
              <p className={styles.description}>C++中的智能指针是自动化内存管理的一种方式。本文介绍C++智能指针的类型，以及每种类型的使用场景。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 