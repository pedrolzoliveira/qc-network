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
              part1_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'Parts',
                  key: 'id',
                  OnUpdate: 'CASCADE',
                },
              },
              part2_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'Parts',
                  key: 'id',
                  OnUpdate: 'CASCADE',
                }
              },
              winner_id: {
                type: DataTypes.INTEGER,    
                allowNull: true,
                references: {
                  model: 'Parts',
                  key: 'id',
                  OnUpdate: 'CASCADE',
                }      
              },
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Tournament, {foreignKey: 'id', as: 'tournament'});
    }
}


module.exports = Match;