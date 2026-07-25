#!/bin/bash

# Frontend startup script for Catalyst deployment

echo "Building frontend..."
cd /app/frontend
npm install
npm run build

echo "Starting frontend server..."
# Serve the built files using a simple HTTP server
npx serve -s dist -l ${PORT:-3000}
