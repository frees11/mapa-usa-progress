#!/bin/bash

# Generate version timestamp
VERSION=$(date +%s)

echo "Building with version: $VERSION"

# Replace __VERSION__ placeholder in index.html
sed "s/__VERSION__/$VERSION/g" index.html > index.html.tmp
mv index.html.tmp index.html

# Update version in config.json
if [ -f config.json ]; then
  # Use sed to update the version field
  sed "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/g" config.json > config.json.tmp
  mv config.json.tmp config.json
  echo "Updated config.json version to: $VERSION"
fi

echo "Build complete!"
