const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/static'));
app.use(express.json());
app.use(routes);

app.listen(3333);