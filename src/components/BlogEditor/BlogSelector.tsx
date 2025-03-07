import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface BlogSelectorProps {
  onSelect: (fileName: string) => void;
}

interface BlogFile {
  name: string;
  path: string;
}

export default function BlogSelector({ onSelect }: BlogSelectorProps) {
  const [blogFiles, setBlogFiles] = useState<BlogFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogFiles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/list-blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogFiles(data.files);
        } else {
          setError('获取博客列表失败');
        }
      } catch (err) {
        setError('无法连接到服务器');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogFiles();
  }, []);

  if (loading) {
    return <div className={styles.selectorLoading}>加载中...</div>;
  }

  if (error) {
    return <div className={styles.selectorError}>{error}</div>;
  }

  return (
    <div className={styles.selectorContainer}>
      <select 
        className={styles.selector}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">选择要编辑的文章</option>
        {blogFiles.map((file) => (
          <option key={file.path} value={file.name}>
            {file.name}
          </option>
        ))}
      </select>
    </div>
  );
} 