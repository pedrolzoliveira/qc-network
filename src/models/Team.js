const { Model, DataTypes } = require('sequelize');
const TeamPlayers = require('./TeamPlayers');

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
                    model: 'users',
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
        this.belongsToMany(models.User, {foreignKey: 'team_id', through: TeamPlayers, as: 'user'});
    }
}

module.exports = Team;