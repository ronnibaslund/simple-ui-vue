#!/bin/bash

echo "Stopping and removing Daisy documentation container..."
docker stop daisy-docs 2>/dev/null || true
docker rm daisy-docs 2>/dev/null || true

echo "Container stopped and removed." 