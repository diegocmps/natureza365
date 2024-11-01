FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "node", "src/index.js" ]