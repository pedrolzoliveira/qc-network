const { Model, DataTypes } = require('sequelize');

class Part extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            player_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Players',
                    key: 'id',
                    OnUpdate: 'CASCADE',
                    OnDelete: 'CASCADE',
                },
            team_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Teams',
                    key: 'id',
                    OnUpdate: 'CASCADE',
                    OnDelete: 'CASCADE',
                }
            }
            },
        }, {
            sequelize
        })
    }
}


module.exports = Part;