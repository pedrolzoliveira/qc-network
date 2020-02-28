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
        this.belongsToMany(models.Team, {foreignKey: 'user_id', through: 'team_players', as: 'team'});
        this.belongsToMany(models.Match, {foreignKey: 'user_id', through: 'matches_parts', as: 'matches'});
    }
}

module.exports = User;