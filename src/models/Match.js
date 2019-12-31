const { Model, DataTypes } = require('sequelize');

class Match extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            part1_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Parts',
                    key: 'id',
                },
            },
            part2_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Parts',
                    key: 'id',
                    }
                },
            winner_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Parts',
                    key: 'id',
                    }
                },
        }, {
            sequelize
        })
    }
}


module.exports = Match;