const express = require('express');
const UserController = require('./controllers/UserController');
const MatchController = require('./controllers/MatchController');
const PartController = require('./controllers/PartController');
const ChampionshipController = require('./controllers/ChampionshipController');
const TournamentController = require('./controllers/TournamentController');

const auth = require('./middlewares/auth');

const routes = express.Router();

routes.get('/users/:id', auth, UserController.index);
routes.post('/users', UserController.store);
routes.post('/login', UserController.login);

module.exports = routes;