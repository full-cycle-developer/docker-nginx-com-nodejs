const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Função para conectar ao banco de dados
function connectToDatabase() {
  const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'db'
  });

  connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar ao DB, tentando novamente...', err);
      setTimeout(connectToDatabase, 2000); // Tenta novamente após 2 segundos
    } else {
      console.log('Conectado ao banco de dados com sucesso.');
    }
  });

  connection.on('error', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectToDatabase(); // Reconecta em caso de perda de conexão
    } else {
      throw err;
    }
  });

  return connection;
}

const connection = connectToDatabase();

app.get('/', (req, res) => {
  const name = 'Some Name'; // Adicione lógica para gerar nomes aqui
  connection.query(`INSERT INTO people (name) VALUES ('${name}')`, (err) => {
    if (err) {
      console.error('Erro ao executar a query', err);
      res.status(500).send('Erro ao executar a query');
    } else {
      res.send('<h1>Full Cycle Rocks!</h1>');
    }
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
