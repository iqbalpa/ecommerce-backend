FROM node:22-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 8000

CMD [ "node", "dist/index.js" ]
