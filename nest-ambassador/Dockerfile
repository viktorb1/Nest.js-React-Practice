FROM node:18.14.2
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD npm run seed:ambassadors && npm run seed:products && npm run seed:orders && npm run start:dev