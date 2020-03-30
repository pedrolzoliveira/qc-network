const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

require('./database');

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/static'));
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(3333);