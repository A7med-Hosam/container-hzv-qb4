#!/bin/sh

# Start 9router in the background
echo "Starting 9router in the background..."
9router &

# Start the Node.js application in the foreground
echo "Starting Node.js application..."
exec node index.js