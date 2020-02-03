const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Player = require('../models/Player');
const {Team, TeamMembers} = require('../models/Team');
const Part = require('../models/Part');
const Match = require('../models/Match');
const Tournament = require('../models/Tournament');
const Token = require('../models/Token');


const connection = new Sequelize(dbConfig);

User.init(connection);
Player.init(connection);
Team.init(connection);
TeamMembers.init(connection);
Part.init(connection);
Match.init(connection);
Tournament.init(connection);
Token.init(connection);


module.exports = connection;