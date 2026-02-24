# Leguan's Blog

一个使用 Vue 3 + Vite + TailwindCSS 构建的个人博客。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router 4** - Vue.js 官方路由
- **Pinia** - Vue 状态管理
- **TailwindCSS** - 原子化 CSS 框架
- **TypeScript** - JavaScript 的超集
- **markdown-it** - Markdown 解析器
- **highlight.js** - 代码高亮

## 功能特性

- 🌓 深色/浅色模式切换
- 📝 Markdown 文章支持
- 🔍 本地搜索
- 📊 文章归档、标签、分类
- 📱 响应式设计
- ⚡ 快速加载

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
src/
├── components/     # 通用组件
├── views/          # 页面视图
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

## 添加文章（部分功能）

1. 在 `public/posts/` 目录下创建 `.md` 文件
2. 在 `public/posts/index.json` 中添加文章元数据

## 部署

项目配置了 GitHub Pages 部署，构建后的文件在 `dist/` 目录