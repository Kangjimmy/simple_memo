const express = require('express');
const app = express();
require('dotenv').config();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

const boardRouter = require('./routes/board');

app.use('/', boardRouter);

app.listen(app.get('port'), () => console.log('server is running..'));
