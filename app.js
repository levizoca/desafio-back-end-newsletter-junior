const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const config = require('./config');

app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Rota para ver todos os registros
app.get('/forms_answers', (req, res) => {
  Query('SELECT * FROM forms_answers', res);
});

// Rota para ver um registro específico
app.get('/forms_answers/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE Id=' + parseInt(req.params.id);
  Query('SELECT * FROM forms_answers' + filter, res);
});

// Rota para deletar um registro específico
app.delete('/forms_answers/:id', (req, res) => {
  Query('DELETE FROM forms_answers WHERE Id=' + parseInt(req.params.id), res);
});

// Função para validar email
function validateEmail(email) {
  var check = /\S+@\S+\.\S+/;
  return check.test(email);
}

// Rota para inserir um registro
app.post('/forms_answers', (req, res) => {
  const name = req.body.name.substring(0, 150);
  const email = req.body.email.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  const phone = req.body.phone.substring(0, 11);

  // Validação de email
  if (validateEmail(email) == false) {
    res.json('Email inválido!');
  } else {
    Query(`INSERT INTO forms_answers(name, email, cpf, phone, created_at) VALUES('${name}', '${email}', '${cpf}', '${phone}', CURRENT_TIMESTAMP)`, res);
  }
});

// Rota para atualizar um registro
app.patch('/forms_answers/:id', (req, res) => {
  const name = req.body.name.substring(0, 150);
  const email = req.body.email.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  const phone = req.body.phone.substring(0, 11);
  
  // Validação de email
  if (validateEmail(email) == false) {
    res.json('Email inválido!');
  } else {
    Query(`UPDATE forms_answers SET name='${name}', email='${email}', cpf='${cpf}', phone='${phone}' WHERE Id=${parseInt(req.params.id)}`, res);
  }
});

// Pesquisa por data
app.get('/search', (req, res) => {
  const dateInit = req.body.dateInit;
  const dateFinal = req.body.dateFinal;
  Query(`SELECT * FROM forms_answers WHERE created_at BETWEEN '${dateInit}' AND '${dateFinal}'`, res);
});

app.listen(port);
console.log('API running on port ' + port);

// Função para executar querys
function Query(sqlQry, res) {
  const connection = mysql.createConnection(config.db);
  connection.query(sqlQry, (error, results, fields) => {
    if (error)
      res.json(error);
    else
      res.json(results);
    connection.end();
    console.log('Executed!');
  });
}