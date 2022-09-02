FROM node:latest

RUN npm install --global nodemon

WORKDIR C:\Users\Gustavo\Documents\desafio\backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]