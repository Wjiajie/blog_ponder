import React, { useEffect, useRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface BlogEditorProps {
  onSave: (content: string) => void;
}

const DEFAULT_CONTENT = 
`
---
title: 
slug: 
authors: [jiajiewu]
tags: []
keywords: ["blog"]
description: ""
draft: false
---

import ZoomImage from '@site/src/components/ZoomImage';

这里添加文章展示内容

<!-- truncate -->

这里继续添加文章剩余内容

图片添加的方式是：
、、、、md
<ZoomImage src="https://s2.loli.net/2025/01/10/9Pgh1T8ZHaeVKCD.jpg" alt='图　洛克希德公司的SR-71"黑鸟"超音速侦察机，1964年' />
、、、、
`;

// 创建一个带链接的 Toast 组件
function showToastWithLink(message: string, link?: string, duration = 5000) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#333';
  toast.style.color = 'white';
  toast.style.padding = '15px 20px';
  toast.style.borderRadius = '4px';
  toast.style.zIndex = '10000';
  toast.style.display = 'flex';
  toast.style.flexDirection = 'column';
  toast.style.alignItems = 'center';
  toast.style.gap = '10px';
  
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  toast.appendChild(messageDiv);
  
  if (link) {
    const linkDiv = document.createElement('a');
    linkDiv.href = link;
    linkDiv.textContent = '点击查看博客列表';
    linkDiv.style.color = '#4CAF50';
    linkDiv.style.textDecoration = 'underline';
    linkDiv.style.cursor = 'pointer';
    toast.appendChild(linkDiv);
  }
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, duration);
}

const REPO_OWNER = 'Wjiajie';
const REPO_NAME = 'blog_ponder';
const BRANCH = 'main';

// GitHub API 相关函数
async function createOrUpdateFile(path: string, content: string, token: string) {
  if (!token) {
    throw new Error('GitHub token is not configured');
  }

  // 首先获取文件的 SHA（如果文件存在）
  let fileSha = '';
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      fileSha = data.sha;
    }
  } catch (error) {
    console.log('File does not exist yet');
  }

  // 创建或更新文件
  const response = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Update blog post via editor',
        content: btoa(unescape(encodeURIComponent(content))),
        branch: BRANCH,
        ...(fileSha && { sha: fileSha }),
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('GitHub API Error:', errorData);
    throw new Error(`Failed to save file to GitHub: ${errorData.message}`);
  }

  return response.json();
}

export default function BlogEditor({ onSave }: BlogEditorProps) {
  const editorRef = useRef<Vditor | null>(null);
  const { colorMode } = useColorMode();
  const history = useHistory();
  const {siteConfig} = useDocusaurusContext();
  const isProduction = siteConfig.customFields?.isProduction as boolean;
  const githubToken = siteConfig.customFields?.githubToken as string;

  const handleSave = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getValue();
      
      // 首先解析整个 frontmatter
      const frontmatterMatch = content.match(/^---([\s\S]*?)---/);
      if (!frontmatterMatch) {
        showToastWithLink('无效的文章格式，请确保包含 frontmatter');
        return;
      }

      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/\ntitle:\s*(.+)/);
      const slugLine = frontmatter.split('\n').find(line => line.trim().startsWith('slug:'));
      
      if (!titleMatch) {
        showToastWithLink('请先输入文章标题');
        return;
      }

      const date = new Date().toISOString().split('T')[0];
      
      // 从 slug 行中提取值，如果没有或为空则使用 undefined
      const currentSlug = slugLine 
        ? slugLine.replace(/^slug:\s*/, '').trim() 
        : '';
      const fileSlug = currentSlug || 'undefined';
      const fileName = `${date}-${fileSlug}.md`;

      // 更新文章内容中的 slug，确保包含日期
      const newSlug = `${date}-${fileSlug}`;
      const updatedContent = content.replace(
        /^(slug:\s*).*$/m,
        `slug: ${newSlug}`
      );
      
      try {
        console.log('Environment:', {
          isProduction,
          githubToken: githubToken ? '存在' : '未设置',
          NODE_ENV: process.env.NODE_ENV
        });
        
        if (isProduction) {
          console.log('正在使用生产环境保存逻辑');
          if (!githubToken) {
            console.log('GitHub Token 未配置');
            showToastWithLink('错误：GitHub Token 未配置，请检查环境变量');
            return;
          }
          
          await createOrUpdateFile(`blog/${fileName}`, updatedContent, githubToken);
          showToastWithLink('✨ 文章保存成功！', '/blog');
        } else {
          const response = await fetch('http://localhost:3001/api/save-blog', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: updatedContent }),
          });
          
          if (response.ok) {
            showToastWithLink('✨ 文章保存成功！', '/blog');
          } else {
            showToastWithLink('保存失败，请重试');
          }
        }
      } catch (error) {
        console.error('Error saving blog post:', error);
        showToastWithLink('保存失败，请重试');
      }
    }
  };

  useEffect(() => {
    const initEditor = async () => {
      if (!editorRef.current) {
        editorRef.current = new Vditor('vditor', {
          height: '100%',
          theme: colorMode === 'dark' ? 'dark' : 'classic',
          mode: 'wysiwyg',
          value: DEFAULT_CONTENT,
          placeholder: '开始写作...',
          cache: {
            enable: true,
          },
          toolbar: [
            'emoji',
            'headings',
            'bold',
            'italic',
            'strike',
            'link',
            '|',
            'list',
            'ordered-list',
            'check',
            'outdent',
            'indent',
            '|',
            'quote',
            'line',
            'code',
            'inline-code',
            'insert-before',
            'insert-after',
            '|',
            'upload',
            'table',
            '|',
            'undo',
            'redo',
            '|',
            'fullscreen',
            'preview',
            'outline',
            'export',
            {
              name: 'save',
              tip: '保存',
              icon: '<svg t="1704899549426" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4231" width="16" height="16"><path d="M960 166.4L857.6 64H160c-52.8 0-96 43.2-96 96v704c0 52.8 43.2 96 96 96h704c52.8 0 96-43.2 96-96V166.4zM512 832c-105.6 0-192-86.4-192-192s86.4-192 192-192 192 86.4 192 192-86.4 192-192 192z m192-512H192V192h512v128z" p-id="4232"></path></svg>',
              click: handleSave,
            },
          ],
          after: () => {
            console.log('Vditor initialized');
            editorRef.current?.focus();
          },
          preview: {
            markdown: {
              toc: true,
              mark: true,
              footnotes: true,
              autoSpace: true,
            },
          },
        });
      }
    };

    initEditor();

    return () => {
      editorRef.current?.destroy();
    };
  }, [colorMode]);

  return (
    <div className={styles.editorContainer}>
      <div id="vditor" className={styles.editor} />
    </div>
  );
} 