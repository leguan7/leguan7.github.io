# Leguan's Blog

一个使用 Vue 3 + Vite + TailwindCSS 构建的个人博客。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router 5** - Vue.js 官方路由
- **Pinia 3** - Vue 状态管理
- **TailwindCSS 4** - 原子化 CSS 框架
- **TypeScript** - JavaScript 的超集
- **markdown-it** - Markdown 解析器
- **highlight.js** - 代码高亮
- **ECharts** - 数据可视化图表
- **Iconify** - 图标库

## 功能特性

- 🌓 深色/浅色模式切换（开发中）
- 📝 Markdown 文章支持
- 🔍 本地搜索
- 📊 文章归档、标签、分类
- 📱 响应式设计
- ⚡ 快速加载
- 🎵 音乐播放器
- 💬 留言板（开发中）
- 📺 番剧/影视追踪
- 🍜 美食记录
- 💪 健身记录
- 🧠 名人收录页
- 🔗 友情链接
- 📸 记忆相册
- 💬 说说

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 类型检查
npm run typecheck

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
src/
├── components/     # 通用组件
│   ├── Navbar.vue
│   ├── Sidebar.vue
│   ├── Footer.vue
│   ├── PostCard.vue
│   ├── MusicPlayer.vue
│   └── ...
├── views/          # 页面视图
│   ├── Home.vue
│   ├── Post.vue
│   ├── Archives.vue
│   ├── Categories.vue
│   ├── Tags.vue
│   ├── About.vue
│   ├── MessageBoard.vue
│   ├── Memory.vue
│   ├── Shuoshuo.vue
│   ├── Bangumi.vue
│   ├── Movies.vue
│   ├── TVSeries.vue
│   ├── Food.vue
│   ├── Fitness.vue
│   ├── Celebrities.vue
│   ├── Links.vue
│   └── ...
├── stores/         # Pinia 状态管理
├── router/         # 路由配置
├── utils/          # 工具函数
├── types/          # TypeScript 类型定义
├── styles/         # 样式文件
├── App.vue         # 根组件
└── main.ts         # 入口文件

public/
├── posts/          # Markdown 文章
└── img/            # 静态图片
```

## 添加文章

1. 在 `public/posts/` 目录下创建 `.md` 文件
2. 在 `public/posts/index.json` 中添加文章元数据

## 部署

项目配置了 GitHub Actions 自动部署到 GitHub Pages，推送到 `main` 分支后自动触发构建。
