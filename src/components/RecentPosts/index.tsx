import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {BlogPost} from '@docusaurus/plugin-content-blog';
import styles from './styles.module.css';

function RecentPostItem({permalink, title, date}: {
  permalink: string;
  title: string;
  date: string;
}) {
  return (
    <li className={styles.postItem}>
      <Link to={permalink} className={styles.postLink}>
        {title}
      </Link>
      <span className={styles.postDate}>
        {new Date(date).toLocaleDateString('zh-CN')}
      </span>
    </li>
  );
}

export default function RecentPosts(): JSX.Element | null {
  try {
    const pluginData = usePluginData('@docusaurus/plugin-content-blog') as {
      blogPosts: BlogPost[];
    };
    console.log('RecentPosts - Plugin data:', pluginData);

    if (!pluginData?.blogPosts?.length) {
      console.warn('RecentPosts - No blog posts found');
      return null;
    }

    const recentPosts = [...pluginData.blogPosts]
      .sort((a, b) => {
        const dateA = new Date(a.metadata.date);
        const dateB = new Date(b.metadata.date);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);

    console.log('RecentPosts - Recent posts:', recentPosts);

    return (
      <div className={styles.recentPosts}>
        <h3>最近文章</h3>
        <ul className={styles.postList}>
          {recentPosts.map((post) => (
            <RecentPostItem
              key={post.id}
              permalink={post.metadata.permalink}
              title={post.metadata.title}
              date={post.metadata.date.toISOString()}
            />
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('RecentPosts - Error:', error);
    return null;
  }
} 