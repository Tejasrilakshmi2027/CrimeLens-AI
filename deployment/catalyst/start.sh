#!/bin/bash

# Catalyst deployment startup script

echo "Starting Crime Lens AI deployment..."

# Set environment variables
export PYTHONPATH="${PYTHONPATH}:/app"

# Run database migrations
echo "Running database migrations..."
alembic upgrade head

# Start the application
echo "Starting FastAPI server..."
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
