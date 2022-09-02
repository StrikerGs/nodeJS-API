// declarando o express
const express = require('express');
const router = express.Router();
//banco de dados
const mysql = require("../mysql");


// ROTA GET QUE RETORNA TODOS OS IPS
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM lista_ip;',
            (error, result, fields) => {
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    ip: result.map(n_ip => {
                        return {
                            node_ip: n_ip.ip,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os Ips.'
                            }
                        }
                    })
                }
                return res.status(200).send({response});
            }
        )

    })

});

// ROTA POST ONDE PODEREMOS INSERIR UM IP PARA SER FILTRADO
router.post('/', (req, res, next) => {

// sempre utilizar conn.release para liberar a conexão para não travar a API.
    mysql.getConnection((error, conn) => {

        if (error) {return res.status(500).send({error: error});}

        conn.query(
            'INSERT INTO ipfiltrado (ip_filtrado) VALUES (?)',
            [req.body.ip_filtrado],
            (error, result, field) => {
                conn.release();

            if(error) {return res.status(500).send({error: error})}

            const response = {
                mensagem: "Ip inserido com sucesso.",
                ipInserido: {
                    node: req.body.ip_filtrado,
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um Ip.'
                    }
                }
            }
             return   res.status(201).send(response);

            }
        )

    });

});

// ROTA GET QUE DEVOLVE OS IPS FILTRADOS
router.get('/filtro', (req, res, next) => {


    mysql.getConnection((error, conn) => {

        if(error) {return res.status(500).send({error: error})}
       
        conn.query(
            'SELECT * FROM lista_ip WHERE ip NOT IN (SELECT ip_filtrado FROM ipfiltrado);',
            (error, result, fields) => {
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    ip: result.map(n_ip => {
                        return {
                            node_ip: n_ip.ip,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os Ips exceto aqueles que foram filtrados.'
                            }
                        }
                    })
                }
                return res.status(200).send({response})
            }
        )


    })

});

module.exports = router;