const { Model, DataTypes } = require('sequelize');

class Tournament extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            stage: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            match_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize
        })
    }
}


module.exports = Tournament;