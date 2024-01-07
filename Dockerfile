FROM node:21.5.0
RUN npm install -g npm
RUN npm install -g http-server
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build

CMD [ "npm", "run", "serve" ]
