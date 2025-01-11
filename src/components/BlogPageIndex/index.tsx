import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import NoteIndex from '../NoteIndex';

export default function BlogPageIndex(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <NoteIndex />
        </div>
      </div>
    </section>
  );
} 