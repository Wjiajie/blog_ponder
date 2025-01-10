import React from 'react';
import Layout from '@theme/Layout';
import BlogEditor from '@site/src/components/BlogEditor';
import { useHistory } from '@docusaurus/router';

export default function EditorPage(): JSX.Element {
  const history = useHistory();

  const handleSave = async (content: string) => {
    try {
      // 从内容的第一行提取标题
      const firstLine = content.split('\n')[0].replace(/^#*\s*/, '');
      const title = firstLine || '未命名文章';


      const response = await fetch('http://localhost:3001/api/save-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('文章保存成功！');
        history.push(`/blog/${data.slug}`);
      } else {
        throw new Error('保存失败');
      }
    } catch (error) {
      console.error('保存文章时出错:', error);
      alert('保存文章时出错，请重试');
    }
  };

  return (
    <Layout
      title="写文章"
      description="使用 Markdown 编辑器写一篇新的博客文章">
      <main>
        <BlogEditor onSave={handleSave} />
      </main>
    </Layout>
  );
} 