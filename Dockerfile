FROM node:14.18-alpine as build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npm run build

FROM node:14.18-alpine
WORKDIR /app
COPY package.json .
COPY server.js .
RUN npm i --only-production
COPY --from=build /app/dist ./dist

CMD node server.js