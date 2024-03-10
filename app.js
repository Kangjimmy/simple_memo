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

app.use('/', signRouter);
app.use('/', boardRouter);
app.use((req, res) => {
  res.status(404).send('not found');
});

app.listen(app.get('port'), () => console.log('server is running..'));
