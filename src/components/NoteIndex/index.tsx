import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type NoteLink = {
  title: string;
  link: string;
  description?: string;
};

const noteLinks: NoteLink[] = [
  {
    title: '编程笔记',
    link: '/notes/programming',
    description: '开发技术、最佳实践',
  },
  {
    title: '阅读笔记',
    link: '/notes/reading',
    description: '书籍摘要、思考',
  },
  {
    title: '生活随笔',
    link: '/notes/life',
    description: '日常感悟、记录',
  },
];

export default function NoteIndex(): JSX.Element {
  return (
    <div className={styles.noteIndex}>
      <h3>笔记索引</h3>
      <div className={styles.cardGrid}>
        {noteLinks.map((note, idx) => (
          <Link
            key={idx}
            to={note.link}
            className={styles.card}>
            <h4>{note.title}</h4>
            {note.description && <p>{note.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
} 