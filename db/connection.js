const mysql = require('mysql2');

const db = mysql.createConnection({

        host: 'localhost',

        port: 3306,

        user: 'root',

        password: 'hellafarted',
        
        database: 'emps'
    },
    console.log('Connected to the employee tracker database!')
);

db.connect((err) => {
    if (err) console.log(err);
    console.log('Connected as ' + db.threadId);
});

module.exports = db;