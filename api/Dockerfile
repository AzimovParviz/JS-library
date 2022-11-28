FROM node:alpine

WORKDIR /app

COPY package*.json .
COPY yarn.lock .
COPY nodemon.json .
COPY tsconfig.json .
COPY .env .

RUN yarn install

COPY . .
EXPOSE 4000
CMD ["yarn", "start:dev"]
