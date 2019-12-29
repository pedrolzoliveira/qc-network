const express = require('express');
const UserController = require('./controllers/UserController');
const MatchController = require('./controllers/MatchController');
const PartController = require('./controllers/PartController');
const TournamentController = require('./controllers/TournamentController');
const PlayerController = require('./controllers/PlayerController');


const auth = require('./middlewares/auth');

const routes = express.Router();

routes.get('/users/:id', auth, UserController.index);
routes.post('/users', UserController.store);
routes.post('/login', UserController.login);
routes.post('/player', PlayerController.store)

module.exports = routes;