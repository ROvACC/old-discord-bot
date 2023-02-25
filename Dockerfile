FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN npm install --production

COPY --from=build /usr/src/app/build ./build

CMD [ "node", "build/index.js" ]
