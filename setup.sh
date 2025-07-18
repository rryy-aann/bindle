#!/bin/bash
set -e

echo "Installing frontend dependencies..."
cd frontend
npm install || echo "Frontend install failed."

echo "Installing backend dependencies..."
cd ../backend
npm install || echo "Backend install failed."

echo "✅ All done."

