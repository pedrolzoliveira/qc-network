const { Model, DataTypes } = require('sequelize');

class Championship extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            tournament_id: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
}


module.exports = Championship;