#!/bin/bash

# Kill any running servers
pkill -f "vite" || true

# Clear caches
rm -rf node_modules package-lock.json .vite

# Install fresh
npm install

# Start dev server
npm run dev