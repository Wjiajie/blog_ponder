import React from 'react';
import Layout from '@theme/Layout';
import BlogPageIndex from '@site/src/components/BlogPageIndex';

export default function IndexPage(): JSX.Element {
  return (
    <Layout
      title="Index"
      description="博客文章索引">
      <main>
        <BlogPageIndex />
      </main>
    </Layout>
  );
} 