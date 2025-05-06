# VitePress Documentation Docker Setup

This project contains Docker configuration for building and serving the VitePress documentation with Nginx.

## Files

- `Dockerfile`: Multi-stage Docker build located at the root of the project for compiling the VitePress site and serving it with Nginx
- `packages/docs/nginx.conf`: Nginx server configuration optimized for VitePress sites
- `docker-compose.yml`: Docker Compose configuration at the root for easy setup

## Building and Running

### Using Docker Compose (Recommended)

From the root of the repository:

```bash
# Build and start the container
docker-compose up -d

# The documentation will be available at http://localhost:8080
```

### Using Docker Directly

From the root of the repository:

```bash
# Build the image
docker build -t daisy-docs .

# Run the container
docker run -d -p 8080:80 daisy-docs

# The documentation will be available at http://localhost:8080
```

## Configuration

- The Nginx configuration is based on the official VitePress deployment recommendations
- The site is served with gzip compression enabled for common text-based assets
- Assets in the `/assets/` directory are served with long-term caching headers
- The server is configured to handle clean URLs 