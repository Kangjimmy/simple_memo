const express = require('express');
const crypto = require('crypto');
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
signRouter.post('/signup', (req, res) => {
  const pw = crypto
    .createHash('sha256')
    .update(req.body.signupPw)
    .digest('hex');
  const { signupId: id, signupName: name, signupTel: tel } = req.body;
  conn.query(
    'insert into member(id, pw, name, tel, reg_date) values(?,?,?,?,now())',
    [id, pw, name, tel],
    (err, results, fields) => {
      if (!err) {
        res.render('signupSuccess');
      } else {
        console.log(err);
      }
    }
  );
});
signRouter.post('/signin', (req, res) => {
  const id = req.body.id.trim();
  const pw = req.body.pw;
  let hashedPw = crypto.createHash('sha256').update(pw).digest('hex');

  conn.query(
    'select id, pw from member where id = ? and pw = ?',
    [id, hashedPw],
    (err, results, fields) => {
      if (!err) {
        if (results.length != 0) {
          req.session.id = id;
          req.session.isSigned = true;
          res.send({ signin: true });
        } else {
          res.send({ signin: false });
        }
      }
    }
  );
});

module.exports = signRouter;
