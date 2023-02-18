FROM node:16-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn build

FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --production

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
