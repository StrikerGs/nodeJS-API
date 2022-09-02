// pegando o express
const express = require('express');
// criando uma instancia do express
const app = express();
// buscando a biblioteca morgan
const morgan = require('morgan');
// buscando a biblioteca body parser
const bodyParser = require('body-parser');

// chamando o arquivo de rota dos ips
const rotaAllIp = require('./routes/ips');



/* em desenvolvimento irá executar um callback para dar prosseguimento aos demais abaixo, monitorando
toda a execução e nos dando um log. */
app.use(morgan('dev'));

/* apenas aceitaremos dados simples */
app.use(bodyParser.urlencoded({extended: false})); // apenas aceitaremos dados simples
app.use(bodyParser.json()); // só aceitaremos formatos json de entrada no body

// definindo as permissões no cabeçalho, como os métodos e etc.
app.use((req,res,next) => {

   res.header('Access-Control-Allow-Origin', '*');
   res.header(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requrested-With, Content-Type, Accept, Authorization',
      );

      if(req.method === 'OPTIONS') {

         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).send({});

      }

      next();
});


//rota
app.use('/ips', rotaAllIp);

// req = request, res = response, next quando quiser chamar outro método
app.use('/teste',(req, res, next) => {

   res.status(200).send({

    mensagem: 'Ok, deu certo'

   });

});

// tratamento incluido para quando não encontrarmos nenhuma rota
app.use((req, res, next) => {

   const erro = new Error('Não encontrado.');
   erro.status = 404;
   next(erro);

});

app.use((error, req, res, next) => {

   res.status(error.status || 500);
   return res.send({

      erro: {
         mensagem: error.message
      }

   })

});

module.exports = app;