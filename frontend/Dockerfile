# Dockerfile for dev
FROM node:latest

RUN npm install webpack -g
RUN npm install webpack-cli webpack-dev-server -g

RUN mkdir /frontend

COPY ./ ./frontend/

WORKDIR /frontend

RUN npm install --no-progress --ignore-optional

RUN webpack

ENV NODE_ENV=development

EXPOSE 3001

CMD npm start