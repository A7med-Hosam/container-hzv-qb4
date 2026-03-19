FROM node:20-alpine

RUN npm install -g 9router

ENV PORT=5000
ENV HOSTNAME=0.0.0.0
ENV HOST=0.0.0.0
ENV NEXT_PUBLIC_BASE_URL=http://localhost:5000

EXPOSE 5000

# Run the underlying server directly to bypass the interactive CLI wrapper
ENTRYPOINT ["node", "/usr/local/lib/node_modules/9router/app/server.js"]
