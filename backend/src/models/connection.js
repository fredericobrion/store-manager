const mysql = require('mysql2/promise');

console.log(process.env.MYSQL_HOSTNAME);
console.log(process.env.MYSQL_PORT);

const connection = mysql.createPool({
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: 'StoreManager',
});

module.exports = connection; 