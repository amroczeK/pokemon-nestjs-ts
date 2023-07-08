FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY . /usr/src/app/
RUN npm install
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
EXPOSE 3000
ENV NODE_ENV=development
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
CMD [ "npm", "run", "start:prod" ]
USER node