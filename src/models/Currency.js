const { Model, DataTypes } = require('sequelize');

class Currency extends Model {

    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
              },
              name: {
                type: DataTypes.STRING,
                allowNull: false,
              } 
        }, {
            sequelize,
        })
    }
}

module.exports = Currency;