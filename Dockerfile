# 构建阶段
FROM node:18-alpine AS builder

# 添加必要的构建依赖
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 首先只复制依赖相关文件
COPY package.json package-lock.json* ./

# 安装依赖
RUN npm install

# 然后复制其他源代码
COPY . .

# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:1337
# 忽略 ESLint 错误
ENV NEXT_LINT_DISABLED=1

# 构建应用 (添加 --no-lint 标志来跳过 lint)
RUN npm run build -- --no-lint

# 生产阶段
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:1337

# 复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "server.js"]