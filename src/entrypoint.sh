#!/bin/sh

# Start 9router in the background (bind to all interfaces)
echo "Starting 9router in the background..."
HOSTNAME=0.0.0.0 HOST=0.0.0.0 9router &

# Start the Node.js application in the foreground
echo "Starting Node.js application..."
exec node index.js