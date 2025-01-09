import React from 'react';
import styles from './styles.module.css';
import NoteIndex from '../NoteIndex';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <NoteIndex />
          </div>
        </div>
      </div>
    </section>
  );
}
