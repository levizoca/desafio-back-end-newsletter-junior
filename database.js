const mysql = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'root',
    database : 'newsletter'
});

function createTable(conn){
    const sql = `CREATE TABLE IF NOT EXISTS forms_answers(
                 Id serial NOT NULL AUTO_INCREMENT,
                 name text NOT NULL,
                 email text NOT NULL,
                 cpf text NOT NULL,
                 phone text NOT NULL,
                 created_at date NOT NULL,
                 PRIMARY KEY (Id)
                 );`;
    
    conn.query(sql, (error, results, fields) => {
        if(error) return console.log(error);
        console.log('Table created!');
    });
}

connection.connect((err) => {
    if(err) return console.log(err);
    console.log('Connected!');
    createTable(connection);
})