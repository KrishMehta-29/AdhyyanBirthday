#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema (creates tables if they don't exist)
npx prisma db push

# Seed database with initial data (only if empty)
npm run db:seed || echo "Database already seeded or seed failed"

# Build Next.js application
npm run build

echo "Build process completed!"
