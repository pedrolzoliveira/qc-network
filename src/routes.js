const express = require('express');
const UserController = require('./controllers/UserController');
const MatchController = require('./controllers/MatchController');
const TournamentController = require('./controllers/TournamentController');
const PageController = require('./controllers/PageController');
const TeamController = require('./controllers/TeamController');


const auth = require('./middlewares/auth');

const routes = express.Router();

routes.get('/', auth, PageController.Home);
routes.get('/login', auth, PageController.Login);
routes.get('/tournaments', auth, PageController.Tournaments);
routes.get('/*', PageController.Error404);

routes.post('/logout', UserController.logout);
routes.post('/signup', UserController.store);
routes.post('/session', UserController.login);
routes.post('/addteammatch', MatchController.addTeam);
routes.post('/addusermatch', MatchController.addUser);
routes.post('/tournament', TournamentController.addMatch);
routes.post('/ctournament', TournamentController.createTournament);
routes.post('/mytournaments', TournamentController.myTournaments);
routes.post('/team', TeamController.store);

module.exports = routes;
