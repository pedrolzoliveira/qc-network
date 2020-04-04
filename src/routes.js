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
routes.get('/recovery', PageController.Recovery);
routes.get('/logout', PageController.Logout);
routes.get('/about', PageController.About);
routes.get('/settings', PageController.Settings);
routes.get('/profile', PageController.Profile);
routes.get('/*', PageController.Error404);

routes.post('/signout', UserController.logout);
routes.post('/signup', UserController.store);
routes.post('/session', UserController.login);
routes.post('/recoveryacc', UserController.recovery);
routes.post('/addteammatch', MatchController.addTeam);
routes.post('/addusermatch', MatchController.addUser);
routes.post('/team', auth, TeamController.store);

routes.post('/tournament', TournamentController.createTournament);
routes.post('/addteamtournament', TournamentController.addTeamMatch);

module.exports = routes;
