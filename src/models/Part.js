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
            in_player: DataTypes.BOOLEAN,
            in_team: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }
}


module.exports = Part;