const express = require('express');
const UserController = require('./controllers/UserController');
const MatchController = require('./controllers/MatchController');
const PartController = require('./controllers/PartController');
const TournamentController = require('./controllers/TournamentController');
const PlayerController = require('./controllers/PlayerController');


const auth = require('./middlewares/auth');

const routes = express.Router();


routes.get('/', (req, res) => {
    return res.send('<html><h1>Página inicial<input></input></h1></html>');
});
routes.get('/users/:id', auth, UserController.index);
routes.post('/users', UserController.store);
routes.post('/login', UserController.login);
routes.post('/player', PlayerController.store);
routes.post('/part', PartController.store);
routes.post('/match', MatchController.store);
routes.post('/tournament', TournamentController.addMatch);


module.exports = routes;