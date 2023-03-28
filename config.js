// Arquivo de configuração do banco de dados
const config = {
    db: {
        host: 'postgres',
        port: 5432,
        user: 'postgres',  // Se necessário alterar o usuário 
        password: 'postgres',  // Se necessário alterar a senha
        database: 'newsletter'
    },
};

module.exports = config;