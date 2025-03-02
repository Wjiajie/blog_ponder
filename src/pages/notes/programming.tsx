import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function Programming(): JSX.Element {
  return (
    <Layout
      title="编程笔记"
      description="开发技术、最佳实践的学习笔记">
      <main className="container margin-vert--lg">
        <h1>编程笔记</h1>
        <div className={styles.content}>
          <h2>软件架构与设计模式</h2>
          <ul>
            <li>
              <Link to="/blog/solid-intro">软件构建中层结构的设计原则--SOLID</Link>
              <p className={styles.description}>SOLID是五条原则的英文首字母拼接，这五条原则指的是：单一职责原则、开闭原则、里氏替换原则、接口隔离原则和依赖反转原则。</p>
            </li>
            <li>
              <Link to="/blog/cpp-design-pattern-1">C++常用设计模式</Link>
              <p className={styles.description}>本文介绍了C++设计模式的六大原则，包括单一职责、里氏替换、依赖倒置、接口隔离、迪米特法则和开放封闭原则，并对常用的设计模式进行分类讲解。</p>
            </li>
          </ul>

          <h2>C++编程</h2>
          <ul>
            <li>
              <Link to="/blog/lvalue-rvalue-move-semantics">一文简介C++左/右值引用以及移动语义</Link>
              <p className={styles.description}>C++中的左值引用和右值引用，以及移动语义，都是为了提高程序性能和效率而设计的语言特性。</p>
            </li>
            <li>
              <Link to="/blog/cpp-smart-pointer">一文简介C++智能指针</Link>
              <p className={styles.description}>C++中的智能指针是自动化内存管理的一种方式。本文介绍C++智能指针的类型，以及每种类型的使用场景。</p>
            </li>
          </ul>

          <h2>工具与应用</h2>
          <ul>
            <li>
              <Link to="/blog/wepub-covert-web-to-book">WePub：将网页转换为电子书的工具</Link>
              <p className={styles.description}>一个可以将网页内容转换为多种电子书格式的工具，包含内容抓取、优化和格式转换等功能。</p>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
} 