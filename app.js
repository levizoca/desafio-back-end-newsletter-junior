const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/forms_answers', (req, res) => {
    execSQLQuery('SELECT * FROM forms_answers', res);
});

app.get('/forms_answers/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE Id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM forms_answers' + filter, res);
});

app.delete('/forms_answers/:id', (req, res) => {
    execSQLQuery('DELETE FROM forms_answers WHERE Id=' + parseInt(req.params.id), res);
});

app.post('/forms_answers', (req, res) => {
    const name = req.body.name.substring(0, 150);
    const email = req.body.email.substring(0, 150);
    const cpf = req.body.cpf.substring(0, 11);
    const phone = req.body.phone.substring(0, 11);
  
    // Validação de email
    function validateEmail(email) {
      var check = /\S+@\S+\.\S+/;
      return check.test(email);
    }

    if (validateEmail(email) == false) {
        res.json('Email inválido!');
    } else {
      execSQLRegister(`INSERT INTO forms_answers(name, email, cpf, phone, created_at) VALUES('${name}', '${email}', '${cpf}', '${phone}', CURRENT_TIMESTAMP)`, res);
    }
});

// Pesquisar por data
app.get('/search', (req, res) => {
  const dateInit = req.body.dateInit;
  const dateFinal = req.body.dateFinal;
  execSQLQuery(`SELECT * FROM forms_answers WHERE created_at BETWEEN '${dateInit}' AND '${dateFinal}'` , res);
});

app.listen(port);
console.log('API running on port ' + port);


function execSQLRegister(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'root',
    database : 'newsletter'
  });
 
  connection.query(sqlQry, (error, results, fields) => {
      if(error) 
        res.json(error);
      else
        res.json('Ação realizada com sucesso!');
      connection.end();
      console.log('Executed!');
  });
}

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'root',
    database : 'newsletter'
  });
 
  connection.query(sqlQry, (error, results, fields) => {
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('Executed!');
  });
}