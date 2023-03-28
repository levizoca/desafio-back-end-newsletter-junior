const Pool = require('pg').Pool;
const config = require('./config');

const pool = new Pool(config.db);

// Função para criar a tabela
function createTable(conn) {
    const sql = "CREATE TABLE IF NOT EXISTS forms_answers(" +
        "Id serial NOT NULL PRIMARY KEY," +
        "name text NOT NULL," +
        "email varchar(150) NOT NULL," +
        "cpf text NOT NULL," +
        "phone text NOT NULL," +
        "created_at date NOT NULL," +
        "UNIQUE (email)" +
        ");";
    conn.query(sql, (err, results) => {
        if(err) return console.log(err);
        console.log('Table created!');
        //conn.end();
    });
}

// Conexão com o banco de dados
pool.connect((err, conn, release) => {
    if(err) return console.log(err);
    createTable(conn);
    release();
});