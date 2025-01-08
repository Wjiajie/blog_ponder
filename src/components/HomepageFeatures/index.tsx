import React from 'react';
import styles from './styles.module.css';
import RecentPosts from '../RecentPosts';
import NoteIndex from '../NoteIndex';
import PopularPosts from '../PopularPosts';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <RecentPosts />
          </div>
          <div className="col col--4">
            <NoteIndex />
          </div>
          <div className="col col--4">
            <PopularPosts />
          </div>
        </div>
      </div>
    </section>
  );
}
