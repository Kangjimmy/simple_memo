const express = require('express');
const conn = require('../utils/mysqlConnection');
const boardRouter = express.Router();

boardRouter.get('/', (req, res) => {
  let id = req.session.user_id;
  res.render('board', { id });
});

boardRouter.post('/', (req, res) => {
  res.redirect('/board');
});

boardRouter.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect('/sign');
    } else {
      console.log(err);
    }
  });
});

boardRouter.post('/getMemo', (req, res) => {
  const id = req.session.user_id;

  conn.query(
    'select no, id, memo_color, memo from memo where id =?',
    [id],
    (err, results, fields) => {
      if (!err) {
        res.send(results);
      }
    }
  );
});

boardRouter.post('/addMemo', (req, res) => {
  const id = req.session.user_id;
  const color = req.body.memo_color;
  conn.query(
    'insert into memo values(null, ?, ?,"", now(), now())',
    [id, color],
    (err, results, fields) => {
      if (!err) {
        res.send(results);
      }
    }
  );
});

boardRouter.delete('/deleteMemo', (req, res) => {
  const id = req.session.user_id;
  const no = req.body.no;

  conn.query(
    'delete from memo where id=? and no=?',
    [id, no],
    (err, results, fields) => {
      if (!err) {
        res.send('success');
      }
    }
  );
});

boardRouter.post('/updateMemo', (req, res) => {
  const id = req.session.user_id;
  let text = req.body.text;
  let no = req.body.no;
  conn.query(
    'update memo set memo = ?, mod_date = now() where id=? and no=?',
    [text, id, no],
    (err, results, fields) => {
      if (!err) {
        res.send({ result: true });
      }
    }
  );
});

boardRouter.post('/updateMemoColor', (req, res) => {
  const id = req.session.user_id;
  let color = req.body.color;
  let no = req.body.no;
  conn.query(
    'update memo set memo_color = ?, mod_date = now() where id=? and no=?',
    [color, id, no],
    (err, results, fields) => {
      if (!err) {
        res.send({ result: true });
      }
    }
  );
});

module.exports = boardRouter;
