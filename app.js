const express = require('express');
const app = express();
const port = 3000;
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config.db);

app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rota para ver todos os registros
app.get('/forms_answers', (req, res) => {
  pool.query('SELECT * FROM forms_answers ORDER BY Id ASC', (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results.rows);
    }
  });
});

// Rota para ver um registro específico
app.get('/forms_answers/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE Id=' + parseInt(req.params.id);
  pool.query('SELECT * FROM forms_answers' + filter, (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results.rows);
    }
  });
});

// Rota para deletar um registro específico
app.delete('/forms_answers/:id', (req, res) => {
  pool.query(`DELETE FROM forms_answers WHERE Id=${req.params.id}`, (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results);
    }
  });
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
    pool.query(`INSERT INTO forms_answers(name, email, cpf, phone, created_at) VALUES('${name}', '${email}', '${cpf}', '${phone}', CURRENT_TIMESTAMP)`, (error, results) => {
      if (error) {
        res.json(error);
      } else {
        res.json(results);
      }
    });
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
    pool.query(`UPDATE forms_answers SET name='${name}', email='${email}', cpf='${cpf}', phone='${phone}', created_at=CURRENT_TIMESTAMP WHERE Id=${req.params.id}`, (error, results) => {
      if (error) {
        res.json(error);
      } else {
        res.json(results);
      }
    });
  }
});

// Pesquisa por data
app.get('/search', (req, res) => {
  const dateInit = req.body.dateInit;
  const dateFinal = req.body.dateFinal;
  pool.query(`SELECT * FROM forms_answers WHERE created_at BETWEEN '${dateInit}' AND '${dateFinal}'`, (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results.rows);
    }
  });
});

app.listen(port);
console.log('API running on port ' + port);