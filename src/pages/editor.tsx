import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import BlogEditor from '@site/src/components/BlogEditor';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

function PasswordForm({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {siteConfig} = useDocusaurusContext();
  const editorPassword = siteConfig.customFields?.editorPassword as string;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('验证信息:', {
      输入密码: password,
      是否配置密码: !!editorPassword,
    });

    if (!editorPassword) {
      setError('系统错误：未配置密码，请联系管理员配置 EDITOR_PASSWORD 环境变量');
      return;
    }

    if (!password) {
      setError('请输入密码');
      return;
    }

    if (password === editorPassword) {
      setError('');
      onSuccess();
    } else {
      setError(`密码错误，请重试。如有疑问请联系管理员。`);
    }
  };

  return (
    <div className={styles.passwordContainer}>
      <form onSubmit={handleSubmit} className={styles.passwordForm}>
        <h2>需要密码才能访问编辑器</h2>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            className={styles.passwordInput}
          />
          {error && (
            <div className={styles.errorCard}>
              <div className={styles.errorIcon}>⚠️</div>
              <div className={styles.errorText}>{error}</div>
            </div>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          确认
        </button>
      </form>
    </div>
  );
}

export default function EditorPage(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();
  const {siteConfig} = useDocusaurusContext();
  const isProduction = siteConfig.customFields?.isProduction as boolean;

  // 检查本地存储中的认证状态
  useEffect(() => {
    const authStatus = localStorage.getItem('editorAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('editorAuthenticated', 'true');
  };

  const handleSave = async (content: string) => {
    try {
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
      title="Write"
      description="Write a new blog post with Markdown editor">
      <main>
        {isProduction && !isAuthenticated ? (
          <PasswordForm onSuccess={handleAuthSuccess} />
        ) : (
          <BlogEditor onSave={handleSave} />
        )}
      </main>
    </Layout>
  );
} 