#!/bin/bash

# Generate version timestamp
VERSION=$(date +%s)

echo "Building with version: $VERSION"

# Replace __VERSION__ placeholder in index.html
sed "s/__VERSION__/$VERSION/g" index.html > index.html.tmp
mv index.html.tmp index.html

echo "Build complete!"
