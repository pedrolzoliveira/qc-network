const { Model, DataTypes } = require('sequelize');

class Team extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize
        })
    }
}

class TeamMembers extends Model {
    static init(sequelize) {
        super.init({
           team_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'teams',
                    key: 'id',
                },
           },
           player_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'players',
                    key: 'id',
                },
           }, 
        },
        {
            sequelize,
            modelName: 'team_players',
        })
    }
}


module.exports = {Team, TeamMembers};