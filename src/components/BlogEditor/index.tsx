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

const DEFAULT_CONTENT = `---
title: 
slug: 
authors: [jiajiewu]
tags: []
keywords: ["blog"]
description: ""
draft: true
---

`;

// 创建一个简单的 Toast 组件
function showToast(message: string, duration = 2000) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#333';
  toast.style.color = 'white';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '4px';
  toast.style.zIndex = '10000';
  toast.textContent = message;
  
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
      const titleMatch = content.match(/title:\s*(.+)/);
      if (titleMatch) {
        const title = titleMatch[1].trim();
        const date = new Date().toISOString().split('T')[0];
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const newSlug = `${date}-${slug}`;
        const updatedContent = content.replace(/slug:\s*.*/, `slug: ${newSlug}`);
        
        try {
          console.log('Environment:', {
            isProduction,
            githubToken: githubToken ? '存在' : '未设置',
            NODE_ENV: process.env.NODE_ENV
          });
          
          if (isProduction) {
            console.log('正在使用生产环境保存逻辑');
            // 检查 GitHub Token
            if (!githubToken) {
              console.log('GitHub Token 未配置');
              showToast('错误：GitHub Token 未配置，请检查环境变量');
              return;
            }
            
            // 生产环境：使用 GitHub API
            await createOrUpdateFile(`blog/${newSlug}.md`, updatedContent, githubToken);
            showToast('文章保存成功！即将跳转到文章页面...');
            setTimeout(() => {
              window.location.href = `/blog/${newSlug}`;
            }, 2000);
          } else {
            // 开发环境：使用本地服务器
            const response = await fetch('http://localhost:3001/api/save-blog', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ content: updatedContent }),
            });
            
            if (response.ok) {
              showToast('文章保存成功！即将跳转到文章页面...');
              setTimeout(() => {
                window.location.href = `/blog/${newSlug}`;
              }, 2000);
            } else {
              showToast('保存失败，请重试');
            }
          }
        } catch (error) {
          console.error('Error saving blog post:', error);
          showToast('保存失败，请重试');
        }
      } else {
        showToast('请先输入文章标题');
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