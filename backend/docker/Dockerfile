FROM node:current-alpine

COPY ./package.json .
RUN yarn install
COPY . /app
EXPOSE 3000
CMD ["nest","start"]