const { Model, DataTypes } = require('sequelize');

class Tournament extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
              },
            price: {
                allowNull: true,
                type: DataTypes.INTEGER,
              },
            prize: {
                allowNull: true,
                type: DataTypes.INTEGER,
              },
            currency: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'currencies',
                  key: 'id',
                  onUpdate: 'CASCADE',
                },
              },
            winner_user: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'users',
                  key: 'id',
                  OnUpdate: 'CASCADE',
                },
              },
            winner_team: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'teams',
                  key: 'id',
                  OnUpdate: 'CASCADE',
                }
            },
            start_at: {
                type: DataTypes.DATE,
              },
            ended_at: {
                type: DataTypes.DATE,
              },
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Match, {foreignKey: 'id', as: 'match'});
    }
}

module.exports = Tournament;