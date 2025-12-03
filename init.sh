#!/bin/bash

# Check if day argument is provided
if [ -z "$1" ]; then
  echo "Pass a day number."
  exit 1
fi

DAY=$1

# Create directory
mkdir -p $DAY

# Variables
TESTS=$DAY/$DAY.test.ts
INDEX=$DAY/index.ts

# Copy template files
cp template/day.ts $DAY/$DAY.ts
cp template/day.test.ts $TESTS
cp template/index.ts $INDEX

# Fix day-specific file content
sed -i '' "s/0/$DAY/g" $TESTS
sed -i '' "s/day\.js/$DAY.js/g" $TESTS
sed -i '' "s/day\.js/$DAY.js/g" $INDEX
sed -i '' "s/getInput(1)/getInput($DAY)/g" $INDEX

# Open the file
code $TESTS
