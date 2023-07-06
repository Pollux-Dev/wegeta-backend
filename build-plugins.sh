#!/bin/bash

# Save the original directory
orig_dir=$(pwd)
for plugin in ./src/plugins/*; do
  if [ -f "$plugin/package.json" ] && [ -f "$plugin/yarn.lock" ]; then
    cd "$plugin" || exit
    echo "Building $plugin..."
    yarn build
    cd "$orig_dir" || exit
  fi
done
