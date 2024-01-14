FROM node:18.12.0-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

RUN yarn build

FROM node:18.12.0-alpine

WORKDIR /app

#RUN yarn global add pm2

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

EXPOSE ${PORT}

CMD ["yarn", "start:prod"]