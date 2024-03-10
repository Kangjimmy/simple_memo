const express = require('express');
const boardRouter = express.Router();

boardRouter.get('/board', (req, res) => {
  res.render('board');
});

signRouter.post('/board', (req, res) => {
  res.render('board');
});

module.exports = boardRouter;
