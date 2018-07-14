FROM node:10

RUN mkdir /app

COPY . /app

RUN npm install

RUN npm run build

CMD [ "npm" "run", "start"]