FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm run start:dev
