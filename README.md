# Daisy Project

A monorepo containing a component library and documentation.

## Project Structure

- `packages/library`: The component library
- `packages/docs`: VitePress documentation site

## Development Instructions

### Setup

```bash
pnpm install
```

### Running Documentation Locally

```bash
pnpm docs:dev
```

### Running Component Library Dev Environment

```bash
pnpm play:vue
```

### Running Histoire Storybook Locally

```bash
pnpm story:dev
```

### Building the Component Library

```bash
pnpm lib:build
```

## Docker Deployment for Documentation and Storybook

This project includes Docker configuration to build and serve both the VitePress documentation and Histoire storybook using Nginx.

### Using Docker Compose

```bash
# Build and start the container
docker-compose up -d

# The documentation will be available at http://localhost:8080
# The storybook will be available at http://localhost:8080/story
```

### Using Provided Scripts

```bash
# Build and run container
./docker-build.sh

# Stop and remove container
./docker-stop.sh
```

### Building Manually

```bash
# Build the image
docker build -t daisy-docs .

# Run the container
docker run -d -p 8080:80 daisy-docs
```

## Accessing the Applications

- Documentation: http://localhost:8080
- Histoire Storybook: http://localhost:8080/story

## Further Information

- See `packages/library/README.md` for more information about the component library
- See `packages/docs/README.md` for more information about the documentation 