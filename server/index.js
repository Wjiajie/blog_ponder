const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const { extractSlugFromContent } = require('./utils');

const app = express();
app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 