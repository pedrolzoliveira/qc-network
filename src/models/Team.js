const { Model, DataTypes } = require('sequelize');

class Team extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            creator_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'players',
                    key: 'id',
                    OnUpdate: 'CASCADE',
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, {foreignKey: 'user_id', through: 'team_players', as: 'players'});
    }
}

module.exports = Team;