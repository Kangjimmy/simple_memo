const express = require('express');
const app = express();
const session = require('express-session');
require('dotenv').config();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'isSigned',
  })
);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const signRouter = require('./routes/signRouter');
const boardRouter = require('./routes/boardRouter');

app.get('/', (req, res) => {
  if (req.session.isSigned) {
    res.redirect('/board');
  } else {
    res.redirect('/sign');
  }
});
const auth = (req, res, next) => {
  const { isSigned } = req.session;
  if (isSigned != undefined) {
    next();
  } else {
    res.redirect('/sign');
  }
};
app.use('/sign', signRouter);
app.use('/board', auth, boardRouter);
app.use((req, res) => {
  res.status(404).render('notFound');
});

app.listen(app.get('port'), () => console.log('server is running...'));
