const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '4yen7r6A@',
  database: 'rating_app'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL DB');
});

module.exports = connection;
