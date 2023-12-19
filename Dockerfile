FROM node:14

WORKDIR /app

# Instalar cliente MySQL
RUN apt-get update && apt-get install -y mysql-client

COPY package*.json ./
COPY server.js .
COPY wait-for-it.sh .

RUN npm install

# Dar permissão de execução para o script wait-for-it.sh
RUN chmod +x wait-for-it.sh

EXPOSE 3000

CMD ["node", "server.js"]
