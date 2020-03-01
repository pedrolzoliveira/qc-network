const { Model, DataTypes } = require('sequelize');

class TeamPlayers extends Model {
    static init(sequelize) {
        super.init({
            team_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                key: true,
                references: {
                  model: 'teams',
                  key: 'id',
                  OnUpdate: 'CASCADE',
                  OnDelete: 'CASCADE',
                }
              },
              user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                key: true,
                references: {
                  model: 'users',
                  key: 'id', 
                  OnUpdate: 'CASCADE',
                  OnDelete: 'CASCADE',
                }
              },
              in_admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
              },
        }, {
            sequelize,
            modelName: 'team_players',
        })
    }
}

module.exports = TeamPlayers;