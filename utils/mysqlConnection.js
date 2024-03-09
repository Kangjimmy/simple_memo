const mysql = require('mysql2');
require('dotenv').config();
// connection 객체 생성
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = conn;
