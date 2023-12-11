FROM node:14

WORKDIR /app

COPY package*.json ./
COPY server.js .

RUN npm install

EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
