const { Model, DataTypes } = require('sequelize');

class Match extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            part1_id: DataTypes.INTEGER,
            part2_id: DataTypes.INTEGER,
            winner_id: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
}


module.exports = Match;