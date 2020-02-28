const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Team = require('../models/Team');
const Match = require('../models/Match');
const Tournament = require('../models/Tournament');
const Token = require('../models/Token');
const Salt = require('../models/Salt');

const connection = new Sequelize(dbConfig);

User.init(connection);
Team.init(connection);
Match.init(connection);
Tournament.init(connection);
Token.init(connection);
Salt.init(connection);

User.associate(connection.models);
Team.associate(connection.models);
Match.associate(connection.models);
Tournament.associate(connection.models);


module.exports = connection;