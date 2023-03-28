// Arquivo de configuração do banco de dados
const config = {
    db: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',  // Se necessário alterar o usuário 
        password: 'root',  // Se necessário alterar a senha
        database: 'newsletter'
    },
};

module.exports = config;