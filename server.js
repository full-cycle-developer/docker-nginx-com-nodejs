const express = require('express');
const mysql = require('mysql');

const app = express();

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'mydb',
});

// Conecta ao banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao MySQL');
});

// Cria a tabela 'people' se ela não existir
db.query(
  'CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))',
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Tabela de pessoas criada');
  }
);

// Rota principal
app.get('/', (req, res) => {
  // Insere um registro na tabela 'people'
  const name = 'Full Cycle Rocks!';
  const sqlInsert = `INSERT INTO people (name) VALUES ('${name}')`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Registro inserido na tabela');
  });

  // Seleciona todos os registros da tabela 'people'
  const sqlSelect = `SELECT name FROM people`;
  db.query(sqlSelect, (err, results) => {
    if (err) {
      throw err;
    }

    // Monta o HTML com a lista de nomes
    let html = '<h1>Full Cycle Rocks!</h1>';
    html += '<ul>';
    for (const row of results) {
      html += `<li>${row.name}</li>`;
    }
    html += '</ul>';

    // Envia a resposta
    res.send(html);
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
