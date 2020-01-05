const { Model, DataTypes } = require('sequelize');

class Tournament extends Model {
    static init(sequelize) {
        super.init({
            tournament_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            stage: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            match_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'matches',
                    key: 'id',
                },
            },
        }, {
            sequelize
        })
    }
}

module.exports = Tournament;