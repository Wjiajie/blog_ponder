const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 从内容中提取 slug
function extractSlugFromContent(content) {
  const lines = content.split('\n');
  let slug = '';
  let inFrontmatter = false;
  
  for (const line of lines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (inFrontmatter && line.startsWith('slug:')) {
      slug = line.slice(5).trim();
      break;
    }
  }
  
  return slug;
}

// 保存博客文章
app.post('/api/save-blog', async (req, res) => {
  try {
    const { content } = req.body;
    const slug = extractSlugFromContent(content);
    if (!slug) {
      return res.status(400).json({ error: 'Missing slug in frontmatter' });
    }

    const fileName = `${slug}.md`;
    const filePath = path.join(__dirname, '../blog', fileName);

    await fs.writeFile(filePath, content, 'utf8');
    res.json({ success: true, fileName });
  } catch (error) {
    console.error('Error saving blog post:', error);
    res.status(500).json({ error: 'Failed to save blog post' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 