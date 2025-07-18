#!/bin/bash

echo "📦 Installing frontend dependencies..."
cd frontend
pnpm install

echo "📦 Installing backend dependencies..."
cd ../backend
pnpm install

echo "✅ Setup complete."

