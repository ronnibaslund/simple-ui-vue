FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json files for efficient layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/docs/package.json ./packages/docs/

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the entire project
COPY . .

# Build the VitePress site
RUN pnpm docs:build

# Nginx stage
FROM nginx:stable-alpine

# Copy nginx configuration
# Using local path since we're building from the context where the Dockerfile is located
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from build stage
COPY --from=build /app/packages/docs/.vitepress/dist /app

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 