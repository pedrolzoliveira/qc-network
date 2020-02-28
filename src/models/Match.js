const { Model, DataTypes } = require('sequelize');

class Match extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
              },
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'Tournaments',
                  key: 'id',
                  OnUpdate: 'CASCADE',
                },
              },
            winner_user: {
                type: DataTypes.INTEGER,    
                allowNull: true,
                references: {
                  model: 'users',
                  key: 'id',
                  OnUpdate: 'CASCADE',
                }      
              },
            winner_team: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'teams',
                  key: 'id',
                  OnUpdate: 'CASCADE',
                }
              }
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Tournament, {foreignKey: 'id', as: 'tournament'});
        this.belongsToMany(models.User, {foreignKey: 'user_id', through: 'matches_parts', as: 'users'});
        this.belongsToMany(models.Team, {foreignKey: 'team_id', through: 'matches_parts', as: 'teams'});
    }
}


module.exports = Match;