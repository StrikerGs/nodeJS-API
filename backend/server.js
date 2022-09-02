// importando o http para o projeto
const http = require('http');
// importando app para o server
const app = require('./app');
// vairavel para armazenar a porta do serviço
const port = process.env.PORT || 3000;

// criando o server
const server = http.createServer(app);
server.listen(port);