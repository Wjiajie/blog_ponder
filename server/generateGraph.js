const fs = require('fs');
const path = require('path');

// 从NoteIndex组件中读取noteItems数据
function getNoteItemsFromComponent() {
  try {
    const noteIndexPath = path.join(process.cwd(), 'src', 'components', 'NoteIndex', 'index.tsx');
    const content = fs.readFileSync(noteIndexPath, 'utf8');
    
    // 提取noteItems数组
    const noteItemsMatch = content.match(/const\s+noteItems\s*:\s*NoteItem\[\]\s*=\s*\[([\s\S]*?)\];/);
    
    if (!noteItemsMatch || !noteItemsMatch[1]) {
      console.error('无法从NoteIndex组件中提取noteItems数据');
      process.exit(1);
    }
    
    // 解析noteItems数据
    const noteItemsStr = noteItemsMatch[1];
    // 更新正则表达式，支持单引号和双引号
    const itemRegex = /{\s*title:\s*['"]([^'"]+)['"]\s*,\s*link:\s*['"]([^'"]+)['"]\s*,\s*level:\s*(\d+)(?:\s*,\s*icon:\s*['"]([^'"]+)['"])?\s*}/g;
    
    const noteItems = [];
    let match;
    
    while ((match = itemRegex.exec(noteItemsStr)) !== null) {
      const [, title, link, level, icon] = match;
      noteItems.push({
        title,
        link,
        level: parseInt(level, 10),
        ...(icon ? { icon } : {})
      });
    }
    
    if (noteItems.length === 0) {
      console.error('未能从NoteIndex组件中提取到任何笔记项目，请检查正则表达式是否匹配');
      console.log('提取到的noteItems字符串:', noteItemsStr);
      process.exit(1);
    }
    
    console.log(`从NoteIndex组件中成功提取了 ${noteItems.length} 个笔记项目`);
    return noteItems;
  } catch (error) {
    console.error('读取NoteIndex组件数据时出错:', error);
    process.exit(1);
  }
}

// 获取noteItems数据
const noteItems = getNoteItemsFromComponent();

// 图谱数据结构
const graphData = {
  nodes: [],
  links: []
};

// 节点映射，用于快速查找
const nodeMap = new Map();

// 从文件路径获取ID
function getIdFromPath(filePath) {
  const filename = path.basename(filePath).replace(/\.(tsx|mdx|md)$/, '');
  return filename;
}

// 从文件路径获取名称
function getNameFromPath(filePath, defaultName = '') {
  try {
    if (filePath.endsWith('.tsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const titleMatch = content.match(/title="([^"]+)"/);
      if (titleMatch && titleMatch[1]) {
        return titleMatch[1];
      }
    }
    
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

// 提取TSX文件中的链接
function extractLinksFromTsx(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const links = [];
    
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

// 提取Markdown文件中的链接
function extractLinksFromMd(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const links = [];
    
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

// 从TSX文件中提取博客文章的标题和描述
function extractBlogInfoFromTsx(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const blogInfo = new Map();
    
    // 匹配博客链接和标题
    const linkRegex = /<Link\s+to=["']\/blog\/([^"']+)["']>([^<]+)<\/Link>/g;
    // 匹配描述
    const descRegex = /<p\s+className={styles\.description}>([^<]+)<\/p>/g;
    
    let linkMatch;
    let descMatch;
    let currentBlogId = null;
    
    // 提取链接和标题
    while ((linkMatch = linkRegex.exec(content)) !== null) {
      const [, blogId, title] = linkMatch;
      currentBlogId = blogId;
      blogInfo.set(blogId, { title });
    }
    
    // 提取描述
    while ((descMatch = descRegex.exec(content)) !== null) {
      const [, description] = descMatch;
      if (currentBlogId && blogInfo.has(currentBlogId)) {
        blogInfo.get(currentBlogId).description = description;
      }
    }
    
    return blogInfo;
  } catch (error) {
    console.error(`Error extracting blog info from ${filePath}:`, error);
    return new Map();
  }
}

// 构建图谱
function buildGraph() {
  const workspaceRoot = process.cwd();
  const notesDir = path.join(workspaceRoot, 'src', 'pages', 'notes');
  const blogDir = path.join(workspaceRoot, 'blog');
  
  // 添加根节点（首页）
  const rootNode = {
    id: 'index',
    name: '笔记索引',
    type: 'note',
    group: 0 // 根节点组
  };
  
  graphData.nodes.push(rootNode);
  nodeMap.set('index', rootNode);
  
  // 首先添加所有笔记页面作为节点
  noteItems.forEach((item, index) => {
    const id = item.link.replace(/^\/notes\//, '');
    const node = {
      id: id,
      name: item.title,
      type: 'note',
      group: item.level
    };
    
    graphData.nodes.push(node);
    nodeMap.set(id, node);
    
    // 如果是一级节点，连接到根节点
    if (item.level === 1) {
      graphData.links.push({
        source: 'index',
        target: id,
        value: 3 // 更高的权重
      });
    }
    // 如果有父级节点（二级及以下节点），添加连接
    else if (item.level > 1 && index > 0) {
      // 查找前面最近的更高级别节点作为父节点
      for (let i = index - 1; i >= 0; i--) {
        if (noteItems[i].level < item.level) {
          const parentId = noteItems[i].link.replace(/^\/notes\//, '');
          graphData.links.push({
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
    
    // 创建一个Map来存储所有博客文章的信息
    const blogInfoMap = new Map();
    
    // 首先收集所有博客文章的信息
    for (const file of noteFiles) {
      const filePath = path.join(notesDir, file);
      const blogInfo = extractBlogInfoFromTsx(filePath);
      blogInfo.forEach((info, blogId) => {
        blogInfoMap.set(blogId, info);
      });
    }
    
    for (const file of noteFiles) {
      const filePath = path.join(notesDir, file);
      const sourceId = getIdFromPath(filePath);
      
      // 确保源节点存在
      if (!nodeMap.has(sourceId)) {
        const node = {
          id: sourceId,
          name: getNameFromPath(filePath, sourceId),
          type: 'note',
          group: 3 // 默认组
        };
        graphData.nodes.push(node);
        nodeMap.set(sourceId, node);
      }
      
      // 提取文件中的链接
      const extractedLinks = extractLinksFromTsx(filePath);
      
      for (const link of extractedLinks) {
        let targetId;
        let targetType = 'note';
        
        if (link.startsWith('/notes/')) {
          targetId = link.replace(/^\/notes\//, '');
        } else if (link.startsWith('/blog/')) {
          targetId = link.replace(/^\/blog\//, '');
          targetType = 'blog';
          
          // 确保博客节点存在
          if (!nodeMap.has(targetId)) {
            const blogInfo = blogInfoMap.get(targetId) || {};
            const node = {
              id: targetId,
              name: blogInfo.title || targetId,
              description: blogInfo.description || '',
              type: 'blog',
              group: 4 // 博客组
            };
            
            graphData.nodes.push(node);
            nodeMap.set(targetId, node);
          }
        } else {
          continue; // 跳过其他类型的链接
        }
        
        // 避免重复的连接
        const linkExists = graphData.links.some(l => 
          l.source === sourceId && l.target === targetId
        );
        
        if (!linkExists) {
          // 添加连接
          graphData.links.push({
            source: sourceId,
            target: targetId,
            value: targetType === 'note' ? 2 : 1
          });
        }
      }
    }
    
  } catch (error) {
    console.error('Error processing files:', error);
  }
  
  return graphData;
}

// 主函数
function main() {
  console.log('开始生成知识图谱数据...');
  const graph = buildGraph();
  
  // 校验JSON格式
  try {
    // 尝试序列化和反序列化，确保格式正确
    const jsonStr = JSON.stringify(graph, null, 2);
    JSON.parse(jsonStr);
    
    // 保存到文件
    const outputPath = path.join(process.cwd(), 'static', 'graph.json');
    fs.writeFileSync(outputPath, jsonStr);
    
    console.log(`图谱生成完成！共有 ${graph.nodes.length} 个节点和 ${graph.links.length} 条连接。`);
    console.log(`数据已保存到: ${outputPath}`);
  } catch (error) {
    console.error('生成JSON时出错:', error);
    process.exit(1);
  }
}

// 执行主函数
main(); 