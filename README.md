# Ponder - 一个优雅的个人博客系统

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0-brightgreen.svg)

Ponder 是一个基于 Docusaurus v3 构建的现代化个人博客系统，专注于提供清晰、优雅的阅读体验。

## ✨ 特性

- 📝 支持 Markdown 和 MDX 写作
- 🧮 内置 KaTeX 数学公式支持
- 🔍 集成中英文全文搜索功能
- 💬 基于 utterances 的评论系统
- 📱 响应式设计，支持移动端访问
- 🎨 优雅的排版和自定义主题
- ⚡️ 快速的页面加载速度
- 🖼️ 支持图片优化和懒加载
- ✏️ 在线编辑器支持

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0
- npm 或 yarn

### 安装

```bash
# 克隆项目
git clone https://github.com/Wjiajie/blog_ponder.git
cd blog_ponder

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 项目结构

```
blog_ponder/
├── blog/                # 博客文章目录
├── src/                 # 源代码
│   ├── css/            # 自定义样式
│   ├── pages/          # 页面组件
│   └── plugins/        # 自定义插件
├── static/             # 静态资源
├── docusaurus.config.ts # Docusaurus 配置
└── server/             # 后端服务
```

## 📝 写作

1. 在 `blog` 目录下创建新的 Markdown 文件
2. 使用内置的在线编辑器 (`/editor`) 创建和编辑文章
3. 支持以下功能：
   - Markdown 格式
   - 数学公式 (KaTeX)
   - 代码高亮
   - 图片优化
   - 自定义标签

## 🛠 配置

主要配置文件为 `docusaurus.config.ts`，可以自定义：

- 网站基本信息
- 导航栏和页脚
- 主题设置
- 插件配置
- 搜索设置
- 评论系统

## 🌐 部署

项目可以部署到任何静态网站托管服务：

```bash
# 构建静态文件
npm run build

# 本地预览构建结果
npm run serve
```

## 📄 许可证

本项目基于 MIT 许可证开源。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 📮 联系方式

- Jike: [@jiajiewu_ponder](https://jike.city/jiajiewu_ponder)
- GitHub: [@Wjiajie](https://github.com/Wjiajie)
