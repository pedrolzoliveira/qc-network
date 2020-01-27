const express = require('express');
const UserController = require('./controllers/UserController');
const MatchController = require('./controllers/MatchController');
const PartController = require('./controllers/PartController');
const TournamentController = require('./controllers/TournamentController');
const PlayerController = require('./controllers/PlayerController');
const PageController = require('./controllers/PageController');

const auth = require('./middlewares/auth');

const routes = express.Router();

routes.get('/', PageController.Home);
routes.get('/login', PageController.Login);
routes.get('/users/:id', auth, UserController.index);
routes.post('/signup', UserController.store);
routes.post('/session', UserController.login);
routes.post('/player', PlayerController.store);
routes.post('/part', PartController.store);
routes.post('/match', MatchController.store);
routes.post('/tournament', TournamentController.addMatch);


module.exports = routes;