const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'db'
});

connection.connect();

app.get('/', (req, res) => {
  const name = 'Some Name';
  connection.query(`INSERT INTO people (name) VALUES ('${name}')`, (err) => {
    if (err) throw err;
    res.send('<h1>Full Cycle Rocks!</h1>');
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
