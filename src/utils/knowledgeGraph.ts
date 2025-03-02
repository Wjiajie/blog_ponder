import fs from 'fs';
import path from 'path';
import React from 'react';
import { load } from 'cheerio';

// 图谱节点类型
export interface GraphNode {
  id: string;
  name: string;
  type: 'note' | 'blog';
  group?: number;
}

// 图谱连接类型
export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

// 完整的图谱数据结构
export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// 从文件路径获取ID
function getIdFromPath(filePath: string): string {
  // 去掉扩展名和前缀路径
  const filename = path.basename(filePath).replace(/\.(tsx|mdx|md)$/, '');
  return filename;
}

// 从文件路径获取名称
function getNameFromPath(filePath: string, defaultName: string = ''): string {
  // 对于笔记页面，解析tsx文件提取title
  try {
    if (filePath.endsWith('.tsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const titleMatch = content.match(/title="([^"]+)"/);
      if (titleMatch && titleMatch[1]) {
        return titleMatch[1];
      }
    }
    
    // 对于博客页面，解析markdown文件提取title
    if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const titleMatch = content.match(/title:\s*(.+)/);
      if (titleMatch && titleMatch[1]) {
        return titleMatch[1].trim().replace(/['"]/g, '');
      }
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
  }
  
  return defaultName || getIdFromPath(filePath);
}

// 分析TSX文件中的链接
function extractLinksFromTsx(filePath: string): string[] {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const links: string[] = [];
    
    // 匹配所有<Link to="...">标签
    const linkRegex = /<Link\s+to=["']([^"']+)["']/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const link = match[1];
      if (link.startsWith('/notes/') || link.startsWith('/blog/')) {
        links.push(link);
      }
    }
    
    return links;
  } catch (error) {
    console.error(`Error extracting links from ${filePath}:`, error);
    return [];
  }
}

// 分析Markdown文件中的链接
function extractLinksFromMd(filePath: string): string[] {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const links: string[] = [];
    
    // 匹配Markdown链接格式 [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const link = match[2];
      if (link.startsWith('/notes/') || link.startsWith('/blog/')) {
        links.push(link);
      }
    }
    
    return links;
  } catch (error) {
    console.error(`Error extracting links from ${filePath}:`, error);
    return [];
  }
}

// 从note项目数据生成图谱
export function generateGraphDataFromNoteItems(noteItems: any[]): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const nodeMap = new Map<string, GraphNode>();
  
  // 工作区根目录
  const workspaceRoot = process.cwd();
  const notesDir = path.join(workspaceRoot, 'src', 'pages', 'notes');
  const blogDir = path.join(workspaceRoot, 'blog');
  
  // 首先添加所有笔记页面作为节点
  noteItems.forEach((item, index) => {
    const id = item.link.replace(/^\/notes\//, '');
    const node: GraphNode = {
      id,
      name: item.title,
      type: 'note',
      group: item.level
    };
    
    nodes.push(node);
    nodeMap.set(id, node);
    
    // 如果有父级节点，添加连接
    if (item.level > 1 && index > 0) {
      // 查找前面最近的更高级别节点作为父节点
      for (let i = index - 1; i >= 0; i--) {
        if (noteItems[i].level < item.level) {
          const parentId = noteItems[i].link.replace(/^\/notes\//, '');
          links.push({
            source: parentId,
            target: id,
            value: 2
          });
          break;
        }
      }
    }
  });
  
  // 处理每个笔记页面的文件内容，提取链接
  try {
    const noteFiles = fs.readdirSync(notesDir).filter(f => f.endsWith('.tsx'));
    
    for (const file of noteFiles) {
      const filePath = path.join(notesDir, file);
      const sourceId = getIdFromPath(filePath);
      
      // 确保源节点存在
      if (!nodeMap.has(sourceId)) {
        const node: GraphNode = {
          id: sourceId,
          name: getNameFromPath(filePath, sourceId),
          type: 'note',
          group: 3 // 默认组
        };
        nodes.push(node);
        nodeMap.set(sourceId, node);
      }
      
      // 提取文件中的链接
      const extractedLinks = extractLinksFromTsx(filePath);
      
      for (const link of extractedLinks) {
        let targetId;
        let targetType: 'note' | 'blog' = 'note';
        
        if (link.startsWith('/notes/')) {
          targetId = link.replace(/^\/notes\//, '');
        } else if (link.startsWith('/blog/')) {
          targetId = link.replace(/^\/blog\//, '');
          targetType = 'blog';
          
          // 确保博客节点存在
          if (!nodeMap.has(targetId)) {
            const blogFilePath = path.join(blogDir, targetId + '.md');
            const altBlogFilePath = path.join(blogDir, targetId + '.mdx');
            
            let blogPath = fs.existsSync(blogFilePath) ? blogFilePath : 
                          (fs.existsSync(altBlogFilePath) ? altBlogFilePath : null);
            
            const node: GraphNode = {
              id: targetId,
              name: blogPath ? getNameFromPath(blogPath, targetId) : targetId,
              type: 'blog',
              group: 4 // 博客组
            };
            
            nodes.push(node);
            nodeMap.set(targetId, node);
          }
        } else {
          continue; // 跳过其他类型的链接
        }
        
        // 添加连接
        links.push({
          source: sourceId,
          target: targetId,
          value: targetType === 'note' ? 2 : 1
        });
      }
    }
  } catch (error) {
    console.error('Error processing note files:', error);
  }
  
  return { nodes, links };
}

// 从JSON文件加载图谱数据（如果存在）
export function loadGraphData(): GraphData | null {
  try {
    const filePath = path.join(process.cwd(), 'graph.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data) as GraphData;
    }
  } catch (error) {
    console.error('Error loading graph data:', error);
  }
  return null;
}

// 将图谱数据保存到JSON文件
export function saveGraphData(data: GraphData): void {
  try {
    const filePath = path.join(process.cwd(), 'graph.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving graph data:', error);
  }
} 