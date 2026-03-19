FROM node:20-alpine

RUN npm install -g 9router

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV PORT=20128
ENV NEXT_PUBLIC_BASE_URL=http://localhost:20128

EXPOSE 5000 20128

ENTRYPOINT ["sh", "entrypoint.sh"]
