FROM node:22-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 8000

CMD [ "ts-node", "src/index.ts" ]
