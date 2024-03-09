const express = require('express');
const signRouter = express.Router();
const conn = require('../utils/mysqlConnection');

signRouter.get('/', (req, res) => {
  res.redirect('sign');
});

signRouter.get('/sign', (req, res) => {
  res.render('sign');
});

signRouter.post('/idCheck', (req, res) => {
  conn.query(
    'select id from member where id = ?',
    [req.body.id],
    (err, results, fields) => {
      if (!err) {
        let result;
        results.length !== 0 ? (result = false) : (result = true);
        res.send({ result });
      }
    }
  );
});

module.exports = signRouter;
