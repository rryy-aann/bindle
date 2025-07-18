set -e  # stop on error

echo "Installing frontend dependencies..."
cd frontend
if [ -f package.json ]; then
  npm install
else
  echo "No package.json found in frontend/"
fi

echo "Installing backend dependencies..."
cd ../backend
if [ -f package.json ]; then
  npm install
else
  echo "No package.json found in backend/"
fi

echo "✅ All done."

