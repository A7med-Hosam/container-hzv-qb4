FROM node:20-alpine

RUN npm install -g 9router

ENV PORT=20128
ENV NEXT_PUBLIC_BASE_URL=http://localhost:20128

EXPOSE 20128

ENTRYPOINT ["9router"]
