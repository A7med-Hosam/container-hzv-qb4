#!/bin/sh

export HOSTNAME=0.0.0.0
export HOST=0.0.0.0
export PORT=20128

echo "Starting Node.js application which will manage 9router..."
exec node index.js