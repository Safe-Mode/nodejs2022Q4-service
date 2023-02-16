# syntax=docker/dockerfile:1

FROM node:18.13.0-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci && npm cache clean --force

COPY . .
RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]