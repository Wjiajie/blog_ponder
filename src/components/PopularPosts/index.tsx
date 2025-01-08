import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {BlogPost} from '@docusaurus/plugin-content-blog';
import styles from './styles.module.css';

type BlogPostWithViews = BlogPost & {
  metadata: {
    frontMatter: {
      views?: number;
    };
  };
};

function PopularPostItem({permalink, title, views}: {
  permalink: string;
  title: string;
  views: number;
}) {
  return (
    <li className={styles.postItem}>
      <Link to={permalink} className={styles.postLink}>
        {title}
      </Link>
      <span className={styles.viewCount}>
        {views} 次阅读
      </span>
    </li>
  );
}

export default function PopularPosts(): JSX.Element | null {
  try {
    const pluginData = usePluginData('@docusaurus/plugin-content-blog') as {
      blogPosts: BlogPostWithViews[];
    };
    console.log('PopularPosts - Plugin data:', pluginData);

    if (!pluginData?.blogPosts?.length) {
      console.warn('PopularPosts - No blog posts found');
      return null;
    }

    const postsWithViews = pluginData.blogPosts.filter(post => {
      const hasViews = post.metadata.frontMatter?.views !== undefined;
      console.log('PopularPosts - Post views check:', {
        title: post.metadata.title,
        views: post.metadata.frontMatter?.views,
        hasViews
      });
      return hasViews;
    });

    if (!postsWithViews.length) {
      console.warn('PopularPosts - No posts with views found');
      return null;
    }

    const popularPosts = [...postsWithViews]
      .sort((a, b) => {
        const viewsA = a.metadata.frontMatter.views ?? 0;
        const viewsB = b.metadata.frontMatter.views ?? 0;
        return viewsB - viewsA;
      })
      .slice(0, 5);

    console.log('PopularPosts - Popular posts:', popularPosts);

    return (
      <div className={styles.popularPosts}>
        <h3>热门文章</h3>
        <ul className={styles.postList}>
          {popularPosts.map((post) => (
            <PopularPostItem
              key={post.id}
              permalink={post.metadata.permalink}
              title={post.metadata.title}
              views={post.metadata.frontMatter.views ?? 0}
            />
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('PopularPosts - Error:', error);
    return null;
  }
} 