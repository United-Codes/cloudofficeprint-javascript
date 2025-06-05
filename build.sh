#!/usr/bin/env bash
set -e

# Clean out old build folders
echo "[1] Cleaning previous build artifacts..."
rm -rf dist/ docs/ coverage/ *.tgz

#Generate new HTML documentation with Typedoc
echo "[2] Generating documentation with Typedoc into docs/..."

# Make sure typedoc is installed: npm install --save-dev typedoc
# typedoc will read tsconfig.json by default; override if needed.
npx typedoc --out docs src/index.ts

# Run tests 
echo "[3] Running tests with Jest..."
# Run the teset Make sure jest is installed
npm run test

# Compile TypeScript to JavaScript (into dist/) buil process
echo "[4] Compiling TypeScript to JavaScript (npm run build)..."

# build script should be defined in package.json, e.g. "tsc --project tsconfig.json"
npm run build

# Bundle the browser-friendly bundle with Webpack
echo "[5] Bundling for browser (npm run bundle)..."
npm run bundle

# (Optional) Pack for verification (npm pack)
echo "[6] Creating a tarball via npm pack to verify packaging..."

# This generates cloudofficeprint-javascript-.tgz in the root dic
npm pack


echo
echo "build.sh completed all steps."
