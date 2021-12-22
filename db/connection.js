const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',

        user: 'root',

        password: 'hellafarted',
        
        database: 'emps'
    },
    console.log('Connected to the employee tracker database')
);

module.exports = db;