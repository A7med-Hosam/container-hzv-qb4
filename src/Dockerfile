FROM node:20-alpine

RUN npm install -g 9router

ENV PORT=5000
ENV HOSTNAME=0.0.0.0
ENV HOST=0.0.0.0
ENV NEXT_PUBLIC_BASE_URL=http://localhost:5000

EXPOSE 5000

# Pipe a newline to auto-select "Web UI" so it doesn't block on the interactive menu
ENTRYPOINT ["sh", "-c", "echo '' | 9router --port 5000 --no-browser --skip-update"]
