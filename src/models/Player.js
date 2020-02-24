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
                    OnUpdate: 'CASCADE',
                    OnDelete: 'CASCADE'
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

    static associate(models) {
        this.belongsToMany(models.Team, {foreignKey: 'id'});
        this.belongsTo(models.User, {foreignKey: 'id'});
        this.hasOne(models.Part, {foreignKey: 'id'});
    }
}


module.exports = Player;