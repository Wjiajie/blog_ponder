import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import UtterancesComments from '@site/src/components/UtterancesComments';
import { useLocation } from '@docusaurus/router';

type Props = React.ComponentProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): JSX.Element {
  const location = useLocation();
  // 只在完整的博客文章页面显示评论，不在列表页显示
  const isFullPage = location.pathname.includes('/blog/');

  return (
    <>
      <BlogPostItem {...props} />
      {isFullPage && <UtterancesComments />}
    </>
  );
}
