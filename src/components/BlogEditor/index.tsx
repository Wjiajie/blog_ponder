import React, { useEffect, useRef, useState } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SaveDialog from './SaveDialog';

interface BlogEditorProps {
  onSave: (content: string) => void;
}

const DEFAULT_CONTENT = 
`
---
title: 新文章
slug: new-post
authors: [jiajiewu]
tags: []
keywords: ["blog"]
description: "这是一篇新文章"
draft: false
---

import ZoomImage from '@site/src/components/ZoomImage';

这里添加文章内容...

<!-- truncate -->

这里继续添加文章剩余内容...

图片添加示例：
<ZoomImage src="https://example.com/image.jpg" alt="图片描述" />
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
  const [editorMode, setEditorMode] = useState<'wysiwyg' | 'ir'>('wysiwyg');
  const [editorContent, setEditorContent] = useState(DEFAULT_CONTENT);
  const autoSaveTimer = useRef<NodeJS.Timeout>();
  const isFirstMount = useRef(true);
  const previousColorMode = useRef(colorMode);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // 保存编辑器内容
  const saveEditorContent = () => {
    try {
      if (editorRef.current) {
        const content = editorRef.current.getValue();
        setEditorContent(content);
        localStorage.setItem('editor_draft', content);
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  // 自动保存
  const startAutoSave = () => {
    try {
      if (autoSaveTimer.current) {
        clearInterval(autoSaveTimer.current);
      }
      autoSaveTimer.current = setInterval(saveEditorContent, 30000);
    } catch (error) {
      console.error('Error starting auto save:', error);
    }
  };

  const handleSave = async () => {
    setShowSaveDialog(true);
  };

  const handleSaveConfirm = async (fileName: string) => {
    if (editorRef.current) {
      const content = editorRef.current.getValue();
      
      try {
        console.log('开始保存文章:', {
          fileName,
          contentLength: content.length,
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
          
          try {
            const result = await createOrUpdateFile(`blog/${fileName}`, content, githubToken);
            console.log('GitHub API 响应:', result);
            showToastWithLink('✨ 文章保存成功！', '/blog');
          } catch (githubError) {
            console.error('GitHub API 错误:', githubError);
            showToastWithLink(`保存失败: ${githubError.message}`);
          }
        } else {
          console.log('正在使用本地环境保存逻辑');
          try {
            const response = await fetch('http://localhost:3001/api/save-blog', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                fileName,
                content 
              }),
            });
            
            if (response.ok) {
              const result = await response.json();
              console.log('本地保存响应:', result);
              showToastWithLink('✨ 文章保存成功！', '/blog');
            } else {
              const errorData = await response.json();
              console.error('本地保存错误:', errorData);
              showToastWithLink(`保存失败: ${errorData.message || '未知错误'}`);
            }
          } catch (localError) {
            console.error('本地保存请求错误:', localError);
            showToastWithLink('保存失败：无法连接到本地服务器');
          }
        }
      } catch (error) {
        console.error('保存过程中的错误:', error);
        showToastWithLink(`保存失败: ${error.message || '未知错误'}`);
      }
    }
    setShowSaveDialog(false);
  };

  const handleSaveCancel = () => {
    setShowSaveDialog(false);
  };

  // 初始化编辑器
  const initEditor = async (content: string) => {
    try {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }

      editorRef.current = new Vditor('vditor', {
        height: '100%',
        theme: colorMode === 'dark' ? 'dark' : 'classic',
        mode: editorMode,
        value: content,
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
          '|',
          'edit-mode',
          '|',
          'more',
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
          startAutoSave();
          // 移除 logo
          const logoElement = document.querySelector('.vditor-toolbar__logo');
          if (logoElement) {
            logoElement.remove();
          }
        },
        preview: {
          markdown: {
            toc: true,
            mark: true,
            footnotes: true,
            autoSpace: true,
          },
          hljs: {
            enable: true,
            style: 'github',
          },
          math: {
            engine: 'KaTeX',
            inlineDigit: true,
            macros: {},
          },
          mermaid: {
            enable: true,
            theme: colorMode === 'dark' ? 'dark' : 'default',
          },
          echarts: {
            enable: true,
          },
          graphviz: {
            enable: true,
          },
          plantuml: {
            enable: true,
            server: 'https://www.plantuml.com/plantuml',
          },
          mindmap: {
            enable: true,
          },
          gantt: {
            enable: true,
          },
          speech: {
            enable: true,
          },
        } as any,
        upload: {
          url: '/api/upload',
          accept: 'image/*',
          linkToImgUrl: '/api/fetch',
          max: 10 * 1024 * 1024,
          linkToImgFormat: (response: string) => {
            try {
              const json = JSON.parse(response);
              return json.url;
            } catch (error) {
              console.error('Error parsing upload response:', error);
              return '';
            }
          },
        },
      });
    } catch (error) {
      console.error('Error initializing editor:', error);
    }
  };

  // 初始化和主题变化处理
  useEffect(() => {
    let isMounted = true;

    const setupEditor = async () => {
      if (isMounted) {
        // 首次挂载时，清除并重置 localStorage
        if (isFirstMount.current) {
          localStorage.removeItem('editor_draft');
          localStorage.setItem('editor_draft', DEFAULT_CONTENT);
          isFirstMount.current = false;
        }

        // 主题切换时，保存当前内容
        if (previousColorMode.current !== colorMode) {
          saveEditorContent();
          previousColorMode.current = colorMode;
        }

        // 从 localStorage 获取内容
        const savedContent = localStorage.getItem('editor_draft') || DEFAULT_CONTENT;
        await initEditor(savedContent);
      }
    };

    setupEditor();

    return () => {
      isMounted = false;
      saveEditorContent();
      if (autoSaveTimer.current) {
        clearInterval(autoSaveTimer.current);
      }
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [colorMode, editorMode]);

  return (
    <div className={styles.editorContainer}>
      <div id="vditor" className={styles.editor} />
      {showSaveDialog && (
        <SaveDialog
          onSave={handleSaveConfirm}
          onCancel={handleSaveCancel}
        />
      )}
    </div>
  );
} 