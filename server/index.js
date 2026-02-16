const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const multer = require('multer');
const { extractSlugFromContent } = require('./utils');

const app = express();
app.use(cors());
app.use(express.json());

// Get GitHub token from environment
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BLOG_OWNER = 'Wjiajie';
const BLOG_REPO = 'blog_ponder';

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../static/uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 限制文件大小为 10MB
  },
  fileFilter: function (req, file, cb) {
    // 只允许上传图片文件
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('只允许上传图片文件！'), false);
    }
    cb(null, true);
  }
});

// 确保上传目录存在
async function ensureUploadDir() {
  const uploadDir = path.join(__dirname, '../static/uploads');
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

ensureUploadDir();

app.use('/uploads', express.static(path.join(__dirname, '../static/uploads')));

// 保存博客文章
app.post('/api/save-blog', async (req, res) => {
  try {
    const { fileName, content } = req.body;
    
    if (!fileName || !content) {
      return res.status(400).json({ error: '文件名和内容不能为空' });
    }

    // 确保 blog 目录存在
    const blogDir = path.join(__dirname, '../blog');
    try {
      await fs.access(blogDir);
    } catch (error) {
      await fs.mkdir(blogDir, { recursive: true });
    }

    // 构建完整的文件路径
    const filePath = path.join(blogDir, fileName);

    // 检查文件扩展名
    const extension = path.extname(fileName).toLowerCase();
    if (!['.md', '.mdx'].includes(extension)) {
      return res.status(400).json({ error: '文件扩展名必须是 .md 或 .mdx' });
    }

    // 保存文件
    await fs.writeFile(filePath, content, 'utf8');
    console.log('文章保存成功:', filePath);
    res.json({ success: true, fileName });
  } catch (error) {
    console.error('保存文章时出错:', error);
    res.status(500).json({ error: `保存文章失败: ${error.message}` });
  }
});

// 处理文件上传
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '没有文件被上传' });
  }
  
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ 
    code: 0,
    msg: '上传成功',
    data: {
      url: fileUrl
    }
  });
});

// 处理图片链接获取
app.post('/api/fetch', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const response = await fetch(url);
    const buffer = await response.buffer();
    const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(url);
    const filePath = path.join(__dirname, '../static/uploads', fileName);

    await fs.writeFile(filePath, buffer);
    res.json({
      code: 0,
      msg: '获取成功',
      data: {
        url: `/uploads/${fileName}`
      }
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// 获取博客文章列表
app.get('/api/list-blogs', async (req, res) => {
  try {
    const blogDir = path.join(__dirname, '../blog');
    const files = await fs.readdir(blogDir);
    
    const blogFiles = files
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(file => ({
        name: file,
        path: path.join(blogDir, file)
      }));
    
    res.json({ files: blogFiles });
  } catch (error) {
    console.error('获取博客列表失败:', error);
    res.status(500).json({ error: '获取博客列表失败' });
  }
});

// 获取博客文章内容
app.get('/api/get-blog/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../blog', fileName);

    const content = await fs.readFile(filePath, 'utf8');
    res.json({ content });
  } catch (error) {
    console.error('获取博客内容失败:', error);
    res.status(500).json({ error: '获取博客内容失败' });
  }
});

// 获取 Universe 博客列表 (从 GitHub Issues)
app.get('/api/universe-blogs', async (req, res) => {
  try {
    if (!GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    // Fetch all issues with pagination
    let allIssues = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetch(
        `https://api.github.com/repos/${BLOG_OWNER}/${BLOG_REPO}/issues?state=all&per_page=100&page=${page}`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const issues = await response.json();

      if (issues.length > 0) {
        allIssues = [...allIssues, ...issues];
        page++;
        const linkHeader = response.headers.get('Link');
        hasNextPage = linkHeader && linkHeader.includes('rel="next"');
      } else {
        hasNextPage = false;
      }
    }

    // Filter for Blog Universe issues
    const blogUniverseIssues = allIssues.filter((issue) =>
      issue.title.includes('[Blog Universe]')
    );

    // Process each issue and check for reviewed comments
    const blogData = [];
    for (const issue of blogUniverseIssues) {
      const commentsResponse = await fetch(
        `https://api.github.com/repos/${BLOG_OWNER}/${BLOG_REPO}/issues/${issue.number}/comments`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (commentsResponse.ok) {
        const comments = await commentsResponse.json();
        const hasReviewedComment = comments.some((comment) =>
          comment.body.toLowerCase().includes('reviewed')
        );

        if (hasReviewedComment) {
          const body = issue.body || '';
          const urlMatch = body.match(/URL: (.+)/);
          const descMatch = body.match(/Description: (.+)/);
          const tagsMatch = body.match(/Tags: (.+)/);

          blogData.push({
            id: issue.number,
            title: issue.title.replace('[Blog Universe] ', ''),
            url: urlMatch ? urlMatch[1].trim() : '',
            description: descMatch ? descMatch[1].trim() : '',
            tags: tagsMatch ? tagsMatch[1].trim() : '',
          });
        }
      }
    }

    res.json({ blogs: blogData });
  } catch (error) {
    console.error('获取 Universe 博客失败:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', hasGithubToken: !!GITHUB_TOKEN });
});

// Submit blog to GitHub issues
app.post('/api/submit-blog', async (req, res) => {
  try {
    const { title, url, description, tags } = req.body;

    if (!title || !url || !description) {
      return res.status(400).json({ error: 'Title, URL, and description are required' });
    }

    if (!GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    const issueBody = `## Blog Submission

### URL: ${url}

### Description: ${description}

### Tags: ${tags || 'none'}

---
*Submitted via Blog Universe*`;

    const response = await fetch(`https://api.github.com/repos/${BLOG_OWNER}/${BLOG_REPO}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        title: `[Blog Universe] ${title}`,
        body: issueBody,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create issue');
    }

    const issue = await response.json();
    console.log('Blog submitted successfully:', issue.number);
    res.json({ success: true, issueNumber: issue.number });
  } catch (error) {
    console.error('Error submitting blog:', error);
    res.status(500).json({ error: error.message || 'Failed to submit blog' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 