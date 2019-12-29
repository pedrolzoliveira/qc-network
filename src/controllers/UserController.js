const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


function generateToken(params = {}) {
    return jwt.sign( { id: params.id}, authConfig.secret, {expiresIn: 86400});
}

module.exports = {

    async index(req, res) {
        const user = await User.findByPk(req.params.id, {attributes: ['nickname', 'email']});
        return res.json(user);
    },

    async store(req, res) {
        let { nickname, email, password } = req.body;

        if (await User.findOne({where: {email: email}}) == null) {
            password = await bcrypt.hash(password, 10);
            let user = await User.create( {nickname, email, password} );
            let user_retorn = {nickname, email};
            return res.json({user_return, token: generateToken()});
        } 
        return res.json({error: "Email já cadastrado!"});   
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({where: {email: email}, attributes: ['id', 'nickname', 'email', 'password']});

        if (!user) 
            return res.status(400).send({error: "Email não cadastrado!"});
        
        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: "Senha inválida!"});

        let user_return = {nickname: user.nickname, email: user.email};

        return res.json({user_return, token: generateToken()});
    }
};