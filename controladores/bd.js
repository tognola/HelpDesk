var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '451320',
  database: 'helpdesk'
});

module.exports = connection;
