const { Model, DataTypes } = require('sequelize');

class Part extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            part_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            in_player: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            in_team: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            sequelize
        })
    }
}


module.exports = Part;