const mysql = require('mysql');

//não foi possivel usar variaveis de ambiente.
var pool = mysql.createPool({

user: "gustavo",
password: "gustavo1",
database: "listadeip",
host: "database",
port: 3306
});


module.exports = pool;