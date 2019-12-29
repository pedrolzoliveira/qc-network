const { Model, DataTypes } = require('sequelize');

class Player extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize
        })
    }
}


module.exports = Player;