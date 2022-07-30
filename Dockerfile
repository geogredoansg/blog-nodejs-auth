FROM node:16.16-alpine3.15

ENV NODE_ENV=production

WORKDIR /blog-nodejs

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

CMD [ "node", "index.js" ]