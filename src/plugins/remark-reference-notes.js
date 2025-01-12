import { visit } from 'unist-util-visit';

function remarkReferenceNotes() {
  return (tree) => {
    const references = new Map();
    const notes = new Map();
    let notesStartIndex = -1;
    let notesEndIndex = -1;

    // 首先查找引用定义段落
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (node.type === 'paragraph' && node.children?.length > 0) {
        const firstChild = node.children[0];
        if (firstChild.type === 'text' && firstChild.value.startsWith('^')) {
          const match = firstChild.value.match(/^\^(\d+):\s*(.+)$/);
          if (match) {
            const [, num, content] = match;
            notes.set(num, content);
            if (notesStartIndex === -1) {
              notesStartIndex = i;
            }
            notesEndIndex = i + 1;
            continue;
          }
        }
        if (notesStartIndex !== -1) {
          // 如果已经找到了引用段落，但当前段落不是引用，说明引用段落结束
          break;
        }
      }
    }

    if (notesStartIndex === -1 || notes.size === 0) return;

    // 处理正文中的引用
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value) return;
      const text = node.value;
      
      // 使用字符串分割方法处理引用
      const segments = text.split(/(\^\[\d+\])/);
      if (segments.length === 1) return;

      const parts = [];
      segments.forEach((segment, index) => {
        if (index % 2 === 0) {
          // 普通文本
          if (segment) {
            parts.push({
              type: 'text',
              value: segment
            });
          }
        } else {
          // 引用标记
          const num = segment.match(/\^\[(\d+)\]/)[1];
          // 创建链接节点
          parts.push({
            type: 'link',
            url: `#note${num}`,
            children: [{
              type: 'text',
              value: `[${num}]`
            }],
            data: {
              hProperties: {
                id: `ref${num}`,
                className: ['reference-link']
              }
            }
          });
          references.set(num, true);
        }
      });

      if (parts.length > 0) {
        // 替换当前节点的内容
        if (parent && typeof index === 'number') {
          parent.children.splice(index, 1, ...parts);
        }
      }
    });

    // 创建处理后的引用列表
    const processedNotes = Array.from(notes.entries())
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([num, content]) => ({
        type: 'paragraph',
        children: [
          // 注释编号
          {
            type: 'link',
            url: '',
            children: [{
              type: 'text',
              value: `[${num}]`
            }],
            data: {
              hProperties: {
                id: `note${num}`
              }
            }
          },
          // 空格
          {
            type: 'text',
            value: ' '
          },
          // 注释内容
          {
            type: 'text',
            value: content
          },
          // 空格
          {
            type: 'text',
            value: ' '
          },
          // 返回链接
          {
            type: 'link',
            url: `#ref${num}`,
            children: [{
              type: 'text',
              value: '↩'
            }],
            data: {
              hProperties: {
                className: ['back-to-ref']
              }
            }
          }
        ]
      }));

    // 在原位置替换引用段落
    tree.children.splice(notesStartIndex, notesEndIndex - notesStartIndex, ...processedNotes);
  };
}

export default remarkReferenceNotes; 