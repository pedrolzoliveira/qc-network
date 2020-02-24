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
              winner_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                  model: 'Parts',
                  key: 'id',
                  onUpdate: 'CASCADE',
                },
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
        this.hasMany(models.Match, {foreignKey: 'id'});
    }
}

module.exports = Tournament;