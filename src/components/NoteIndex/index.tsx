import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import KnowledgeGraph from '../KnowledgeGraph';
import useBaseUrl from '@docusaurus/useBaseUrl';

// NoteItem 类型定义
interface NoteItem {
  title: string;
  link: string;
  level: number;
  icon?: string;
}

// 图谱数据结构
interface GraphData {
  nodes: any[];
  links: any[];
}

// 笔记项目数据
const noteItems: NoteItem[] = [
  // 计算机与编程相关
  { title: '计算机科学', link: '/notes/computer-science', level: 1, icon: 'fas fa-laptop-code' },
  { title: '软件架构', link: '/notes/software-architecture', level: 2, icon: 'fas fa-sitemap' },
  { title: '编程语言', link: '/notes/programming-languages', level: 2, icon: 'fas fa-code' },

  // 泛领域知识
  { title: '泛领域知识', link: '/notes/general-knowledge', level: 1, icon: 'fas fa-book-open' },
  { title: '脑科学', link: '/notes/brain-science', level: 2, icon: 'fas fa-brain' },

  // 工具与技术
  { title: '工具使用', link: '/notes/tools-usage', level: 1, icon: 'fas fa-tools' },
  { title: 'RAG', link: '/notes/rag', level: 2, icon: 'fas fa-database' },
  { title: '数据格式转换', link: '/notes/data-format-conversion', level: 2, icon: 'fas fa-exchange-alt' },
  
  // 思想与价值观
  { title: '通用价值', link: '/notes/universal-values', level: 1, icon: 'fas fa-globe' },
  { title: '思维模型', link: '/notes/mental-models', level: 2, icon: 'fas fa-brain' },
  { title: '金钱观', link: '/notes/money-philosophy', level: 2, icon: 'fas fa-money-bill-wave' },
  { title: '创业', link: '/notes/entrepreneurship', level: 2, icon: 'fas fa-rocket' },
  
  // 生活与阅读
  { title: '生活随笔', link: '/notes/life', level: 1, icon: 'fas fa-pen-fancy' },
  { title: '读书杂谈', link: '/notes/reading-notes', level: 2, icon: 'fas fa-book-reader' },
];

// 判断是否是分类标题（一级标题）
const isCategoryTitle = (index: number): boolean => {
  return noteItems[index].level === 1;
};

// 判断是否是分类的最后一项
const isLastItemInCategory = (index: number): boolean => {
  if (index === noteItems.length - 1) return true;
  return noteItems[index + 1].level === 1;
};

const NoteItemComponent = ({ item, index }: { item: NoteItem, index: number }) => {
  const indentClass = `indent-level-${item.level}`;

  // 计算子项总高度（简化版本）
  let childHeight = 0;
  if (item.level === 1) {
    const levelHeights = [0, 0, 3.2, 3.0, 2.8, 2.6, 2.4]; // 为每个级别设置不同的高度常数
    for (let i = index + 1; i < noteItems.length; i++) {
      if (noteItems[i].level > item.level) {
        childHeight += levelHeights[noteItems[i].level];
      } else if (noteItems[i].level <= item.level) {
        break;
      }
    }
  }

  return (
    <>
      <div 
        className={`${styles.noteItem} ${styles[indentClass]}`} 
        style={{ '--child-height': `${childHeight}rem` } as React.CSSProperties}
      >
        {item.icon && <i className={`${item.icon} ${styles.noteIcon}`}></i>}
        <Link to={item.link} className={styles.noteLink}>
          {item.title}
        </Link>
      </div>
      {isLastItemInCategory(index) && index < noteItems.length - 1 && (
        <div className={styles.categorySeparator}></div>
      )}
    </>
  );
};

export default function NoteIndex(): JSX.Element {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState<'none' | 'network' | 'parse' | 'notFound'>('none');
  const graphUrl = useBaseUrl('/graph.json');

  // 加载知识图谱数据
  useEffect(() => {
    async function loadGraphData() {
      try {
        setLoading(true);
        setErrorType('none');
        console.log('尝试加载知识图谱数据...');
        console.log('请求URL:', graphUrl);
        
        const response = await fetch(graphUrl);
        if (response.ok) {
          const data = await response.json();
          console.log('成功加载知识图谱数据:', data ? `${data.nodes?.length || 0}个节点，${data.links?.length || 0}条连接` : '无数据');
          setGraphData(data);
        } else {
          console.error('加载知识图谱数据失败，HTTP状态码:', response.status);
          const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
          
          // 针对Vercel环境提供更详细的错误信息
          if (isVercel) {
            console.error('在Vercel环境中发现问题，可能是部署时未正确包含graph.json文件');
            console.error('请确保在部署前运行 npm run generate-graph 并提交生成的graph.json文件到仓库');
          }
          
          setErrorType(response.status === 404 ? 'notFound' : 'network');
          // 尝试解析错误消息
          try {
            const errorText = await response.text();
            console.error('错误详情:', errorText);
          } catch (parseError) {
            console.error('无法解析错误详情');
          }
        }
      } catch (error) {
        console.error('加载知识图谱数据时发生异常:', error);
        setErrorType('network');
      } finally {
        setLoading(false);
      }
    }

    loadGraphData();
  }, [graphUrl]);

  // 获取错误提示信息
  const getErrorMessage = () => {
    const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
    
    switch (errorType) {
      case 'notFound':
        return (
          <>
            <p>找不到知识图谱数据文件</p>
            {isVercel ? (
              <>
                <p className={styles.graphErrorHint}>
                  在Vercel部署环境中，请确保：
                </p>
                <p className={styles.graphErrorHint}>
                  1. 在本地运行 <code>npm run generate-graph</code> 生成图谱数据
                </p>
                <p className={styles.graphErrorHint}>
                  2. 将生成的 <code>static/graph.json</code> 文件提交到仓库
                </p>
                <p className={styles.graphErrorHint}>
                  3. 重新部署到Vercel
                </p>
              </>
            ) : (
              <>
                <p className={styles.graphErrorHint}>
                  请确保已运行 <code>node server/generateGraph.js</code> 生成图谱数据
                </p>
                <p className={styles.graphErrorHint}>
                  并确认 <code>static/graph.json</code> 文件存在
                </p>
              </>
            )}
          </>
        );
      case 'parse':
        return (
          <>
            <p>知识图谱数据格式不正确</p>
            <p className={styles.graphErrorHint}>
              请重新运行 <code>node server/generateGraph.js</code> 生成图谱数据
            </p>
          </>
        );
      case 'network':
      default:
        return (
          <>
            <p>加载知识图谱数据失败</p>
            {isVercel ? (
              <>
                <p className={styles.graphErrorHint}>
                  在Vercel部署环境中，请确保：
                </p>
                <p className={styles.graphErrorHint}>
                  1. <code>static/graph.json</code> 已提交到仓库
                </p>
                <p className={styles.graphErrorHint}>
                  2. Vercel构建配置正确
                </p>
              </>
            ) : (
              <p className={styles.graphErrorHint}>
                请检查网络连接，或重新运行 <code>node server/generateGraph.js</code> 生成图谱数据
              </p>
            )}
          </>
        );
    }
  };

  return (
    <div className={styles.noteIndexContainer}>
      <div className={styles.noteIndexSidebar}>
        <h2 className={styles.indexTitle}>笔记索引</h2>
        <div className={styles.noteIndex}>
          {noteItems.map((item, index) => (
            <NoteItemComponent key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      
      <div className={styles.knowledgeGraphContainer}>
        {loading ? (
          <div className={styles.loading}>
            <i className="fas fa-spinner fa-spin"></i>
            <p>正在加载知识图谱...</p>
          </div>
        ) : graphData ? (
          <KnowledgeGraph 
            data={graphData} 
            width={650} 
            height={750} 
            noteItems={noteItems}
          />
        ) : (
          <div className={styles.graphError}>
            <i className="fas fa-exclamation-triangle"></i>
            {getErrorMessage()}
          </div>
        )}
      </div>
    </div>
  );
} 