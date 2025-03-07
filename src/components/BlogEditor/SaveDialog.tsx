import React, { useState } from 'react';
import styles from './styles.module.css';

interface SaveDialogProps {
  onSave: (fileName: string) => void;
  onCancel: () => void;
}

export default function SaveDialog({ onSave, onCancel }: SaveDialogProps) {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) {
      setError('请输入文件名');
      return;
    }

    // 检查文件扩展名
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (!extension || (extension !== 'md' && extension !== 'mdx')) {
      setError('文件扩展名必须是 .md 或 .mdx');
      return;
    }

    // 检查文件名格式（允许包含日期格式）
    const nameWithoutExt = fileName.slice(0, -(extension.length + 1));
    if (!/^[a-zA-Z0-9-_.]+$/.test(nameWithoutExt)) {
      setError('文件名只能包含字母、数字、连字符(-)、下划线(_)和点(.)');
      return;
    }

    onSave(fileName);
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <h2>保存文章</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="fileName">文件名 (例如: 2025-03-07-test-blog.md)</label>
            <input
              type="text"
              id="fileName"
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                setError('');
              }}
              placeholder="输入文件名 (.md 或 .mdx)"
            />
            {error && <div className={styles.error}>{error}</div>}
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              取消
            </button>
            <button type="submit" className={styles.saveButton}>
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 