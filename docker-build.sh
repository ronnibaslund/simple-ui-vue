#!/bin/bash

# Exit on error
set -e

echo "Building Docker image for Daisy VitePress documentation and Histoire storybook..."
docker build -t daisy-docs .

echo "Starting container..."
docker run -d --name daisy-docs -p 8080:80 daisy-docs

echo "Done! Applications are now available at:"
echo "- Documentation: http://localhost:8080"
echo "- Histoire Storybook: http://localhost:8080/story" 