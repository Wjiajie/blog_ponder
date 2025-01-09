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

// 示例数据
const noteItems: NoteItem[] = [
  { title: '一级标题', link: '/notes/level1', level: 1, icon: 'fas fa-book' },
  { title: '二级标题', link: '/notes/level2', level: 2, icon: 'fas fa-book' },
  { title: '四级标题', link: '/notes/level4', level: 3, icon: 'fas fa-book' },
  { title: '三级标题', link: '/notes/level3', level: 3, icon: 'fas fa-book' },
  { title: '五级标题', link: '/notes/level5', level: 4, icon: 'fas fa-book' },
  { title: '六级标题', link: '/notes/level6', level: 5, icon: 'fas fa-book' },
  { title: '一级标题', link: '/notes/level1-2', level: 2, icon: 'fas fa-book' },
  { title: '四级标题', link: '/notes/level4', level: 3, icon: 'fas fa-book' },
  { title: '二级标题', link: '/notes/level2-2', level: 2, icon: 'fas fa-book' },
  { title: '三级标题', link: '/notes/level3-2', level: 3, icon: 'fas fa-book' },
  { title: '四级标题', link: '/notes/level4', level: 4, icon: 'fas fa-book' },
  { title: '四级标题', link: '/notes/level4-2', level: 4, icon: 'fas fa-book' },
  { title: '五级标题', link: '/notes/level5-2', level: 5, icon: 'fas fa-book' },
  { title: '六级标题', link: '/notes/level6-2', level: 6, icon: 'fas fa-book' },
];

const NoteItemComponent = ({ item, index }: { item: NoteItem, index: number }) => {
  const indentClass = `indent-level-${item.level}`;

  // 计算子项总高度
  let childHeight = 0;
  const levelHeights = [0, 3.8, 3.41, 3.35, 3.18, 3.05, 2.80]; // 为每个级别设置不同的高度常数
  for (let i = index + 1; i < noteItems.length; i++) {
    if (noteItems[i].level > item.level) {
      childHeight += levelHeights[noteItems[i].level];
    } else if (noteItems[i].level <= item.level) {
      break;
    }
  }

  console.log("wjj test index",index);
  console.log("wjj test item",item);
  console.log("wjj test childHeight",childHeight);

  return (
    <div className={`${styles.noteItem} ${styles[indentClass]}`} style={{ '--child-height': `${childHeight}rem` } as React.CSSProperties}>
      {item.icon && <i className={`${item.icon} ${styles.noteIcon}`}></i>}
      <Link to={item.link} className={styles.noteLink}>
        {item.title}
      </Link>
    </div>
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