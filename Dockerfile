# syntax=docker/dockerfile:1

FROM node:18.13.0
ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

COPY . .
RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]