# syntax=docker/dockerfile:1

FROM node:18.13.0-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci && npm cache clean --force

COPY . .
RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]