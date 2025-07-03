# 使用Node.js构建环境
FROM node:22 as build

# 设置工作目录
WORKDIR /all-zero

# 复制pnpm相关配置文件
# COPY pnpm-lock.yaml pnpm-workspace.yaml ./

# 安装pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm config set registry https://registry.npmmirror.com

# 复制package.json
COPY package.json .

# 安装项目依赖
RUN pnpm install

# 复制项目源代码
COPY . .

# 构建项目
RUN pnpm run build

# 使用Nginx运行环境
FROM nginx:1.29

# 复制构建好的静态文件到Nginx默认目录
COPY --from=build /all-zero/dist /usr/share/nginx/html

# 复制自定义的Nginx配置文件（如果需要，可先跳过，使用默认配置）
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动Nginx命令
CMD ["nginx", "-g", "daemon off;"]
