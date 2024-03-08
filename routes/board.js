const express = require('express');
const boardRouter = express.Router();

boardRouter.get('/', (req, res) => {
  res.redirect('sign');
});

boardRouter.get('/sign', (req, res) => {
  res.render('sign');
});

boardRouter.get('/board', (req, res) => {
  res.render('board');
});

module.exports = boardRouter;
