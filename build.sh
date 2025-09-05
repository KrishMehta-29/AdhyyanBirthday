#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Check if migrations exist, if not use db push for initial setup
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
    echo "Running migrations..."
    npx prisma migrate deploy
else
    echo "No migrations found, using db push..."
    npx prisma db push --accept-data-loss
fi

# Seed database with initial data (only if empty)
npm run db:seed || echo "Database already seeded or seed failed"

# Build Next.js application
npm run build

echo "Build process completed!"
