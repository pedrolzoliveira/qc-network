const { Model, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

class Token extends Model {

    // Modelo para Blacklist de Tokens e atividades com o mesmo - Para adicionar o token a lista negra basta apenas dar um Token.create()

    static init(sequelize) {
        super.init({
            token: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            due_date: DataTypes.DATE,
        }, {
            sequelize,
            tableName: 'token_blacklist',
            timestamps: false,
        })
    }

    static generateToken(params) {
        return jwt.sign( { id: params.id}, authConfig.secret, {expiresIn: 86400});
    }

    static solveToken(token) {
        return jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return err;
            return decoded;
        });
    }
}

module.exports = Token;