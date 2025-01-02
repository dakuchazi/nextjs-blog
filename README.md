# My Blog

基于 Nextjs 搭建的个人博客。



## 博客后台

https://github.com/dakuchazi/strapi-blog-admin



## 开始使用

### 环境要求

Node.js 18.x 或更高版本
NPM 8.x 或更高版本

### 安装步骤

克隆项目

```bash
clone https://github.com/dakuchazi/nextjs-blog
```

安装依赖

```bash
npm install
```

启动开发服务器

```bash
npm run develop
```

服务器将在 http://localhost:3000 启动

### 环境配置说明

开发环境接口地址：http://localhost:1337

## 开发指南

目录结构

```
├── Dockerfile           # Docker 构建配置
├── eslint.config.mjs    # ESLint 配置文件
├── next.config.ts       # Next.js 配置文件
├── package-lock.json    # 依赖包版本锁定文件
├── package.json         # 项目依赖配置
├── postcss.config.mjs   # PostCSS 配置文件
├── public              # 静态资源目录
|  ├── favicon.ico      # 网站图标
|  ├── file.svg         # 文件图标
|  ├── globe.svg        # 全球图标
|  ├── next.svg         # Next.js Logo
|  ├── vercel.svg       # Vercel Logo
|  └── window.svg       # 窗口图标
├── README.md           # 项目说明文档
├── src                 # 源代码目录
|  ├── app             # Next.js App Router 目录
|  ├── components      # React 组件
|  ├── contexts        # React Context 上下文
|  ├── fonts           # 字体文件
|  ├── imgs            # 图片资源
|  ├── styles          # 样式文件
|  ├── types           # TypeScript 类型定义
|  └── utils           # 工具函数
├── tailwind.config.ts  # Tailwind CSS 配置
└── tsconfig.json       # TypeScript 配置
```

### API文档

启动strapi后，可以在以下地址访问API文档：

http://localhost:1337/documentation

### 部署

采用Docker部署，修改dockerfile

```dockerfile
# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:1337 #修改这里
# 忽略 ESLint 错误
ENV NEXT_LINT_DISABLED=1

# 构建应用 (添加 --no-lint 标志来跳过 lint)
RUN npm run build -- --no-lint

# 生产阶段
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:1337  #修改这里
```

