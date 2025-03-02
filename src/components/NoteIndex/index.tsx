import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// NoteItem 类型定义
interface NoteItem {
  title: string;
  link: string;
  level: number;
  icon?: string;
}

// 笔记项目数据
const noteItems: NoteItem[] = [
  // 计算机与编程相关
  { title: '计算机科学', link: '/notes/computer-science', level: 1, icon: 'fas fa-laptop-code' },
  { title: '软件架构', link: '/notes/software-architecture', level: 2, icon: 'fas fa-sitemap' },
  { title: '编程语言', link: '/notes/programming-languages', level: 2, icon: 'fas fa-code' },
  
  // 工具与技术
  { title: '工具使用', link: '/notes/tools-usage', level: 1, icon: 'fas fa-tools' },
  { title: 'RAG', link: '/notes/rag', level: 2, icon: 'fas fa-database' },
  { title: '数据格式转换', link: '/notes/data-format-conversion', level: 2, icon: 'fas fa-exchange-alt' },
  
  // 思想与价值观
  { title: '通用价值', link: '/notes/universal-values', level: 1, icon: 'fas fa-globe' },
  { title: '思维模型', link: '/notes/mental-models', level: 2, icon: 'fas fa-brain' },
  { title: '金钱观', link: '/notes/money-philosophy', level: 2, icon: 'fas fa-money-bill-wave' },
  { title: '创业', link: '/notes/entrepreneurship', level: 2, icon: 'fas fa-rocket' },
  
  // 生活与阅读
  { title: '生活随笔', link: '/notes/life', level: 1, icon: 'fas fa-pen-fancy' },
  { title: '读书杂谈', link: '/notes/reading-notes', level: 2, icon: 'fas fa-book-reader' },
];

// 判断是否是分类标题（一级标题）
const isCategoryTitle = (index: number): boolean => {
  return noteItems[index].level === 1;
};

// 判断是否是分类的最后一项
const isLastItemInCategory = (index: number): boolean => {
  if (index === noteItems.length - 1) return true;
  return noteItems[index + 1].level === 1;
};

const NoteItemComponent = ({ item, index }: { item: NoteItem, index: number }) => {
  const indentClass = `indent-level-${item.level}`;

  // 计算子项总高度（简化版本）
  let childHeight = 0;
  if (item.level === 1) {
    const levelHeights = [0, 0, 3.2, 3.0, 2.8, 2.6, 2.4]; // 为每个级别设置不同的高度常数
    for (let i = index + 1; i < noteItems.length; i++) {
      if (noteItems[i].level > item.level) {
        childHeight += levelHeights[noteItems[i].level];
      } else if (noteItems[i].level <= item.level) {
        break;
      }
    }
  }

  return (
    <>
      <div 
        className={`${styles.noteItem} ${styles[indentClass]}`} 
        style={{ '--child-height': `${childHeight}rem` } as React.CSSProperties}
      >
        {item.icon && <i className={`${item.icon} ${styles.noteIcon}`}></i>}
        <Link to={item.link} className={styles.noteLink}>
          {item.title}
        </Link>
      </div>
      {isLastItemInCategory(index) && index < noteItems.length - 1 && (
        <div className={styles.categorySeparator}></div>
      )}
    </>
  );
};

export default function NoteIndex(): JSX.Element {
  return (
    <div className={styles.noteIndex}>
      {noteItems.map((item, index) => (
        <NoteItemComponent key={index} item={item} index={index} />
      ))}
    </div>
  );
} 