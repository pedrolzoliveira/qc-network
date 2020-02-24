const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasOne(models.Salt, {foreignKey: 'user_id', as: 'salt'});
        this.hasOne(models.Player, {foreignKey: 'id', as: 'player'});
    }
}

module.exports = User;