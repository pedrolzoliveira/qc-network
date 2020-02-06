const { Model, DataTypes } = require('sequelize');

class Salt extends Model {

    static init(sequelize) {
        super.init({
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false,
            } 
        }, {
            sequelize,
            tableName: 'salt',
            timestamps: false,
        })
    }

    static async GenerateSalt(length) {
        const caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.';
        let salt = '';
        for (let i = 0; i < length; i++) {
            salt = salt + caracteres[Math.floor(Math.random() * caracteres.length)];
        }
        return salt;
    }
}

module.exports = Salt;