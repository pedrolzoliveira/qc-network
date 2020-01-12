const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


function generateToken(params = {}) {
    return jwt.sign( { id: params.id}, authConfig.secret, {expiresIn: 86400});
}

async function index(req, res) {
    try {
        const user = await User.findByPk(req.params.id, {attributes: ['name', 'email']});
        return res.json(user);            
    } catch(err) {
        res.json({error: err.message});
    }

}

async function store(req, res) {
    try {
        let { name, email, password } = req.body;
        if (await User.findOne({where: {email: email}}) == null) {
            password = await bcrypt.hash(password, 10);
            await User.create( {name, email, password} );
            return res.json({name, email, token: generateToken()});
        } 
        return res.json({error: "Email já cadastrado!"});   
    } catch(err) {
        res.json({error: err.message});
    }

    
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({where: {email: email}, attributes: ['id', 'name', 'email', 'password']});

        if (!user) 
            return res.status(400).send({error: "Email não cadastrado!"});
        
        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: "Senha inválida!"});

        let user_return = {name: user.name, email: user.email};

        return res.json({user_return, token: generateToken()});
    } catch(err) {
        res.json({error: err.message});
    }
}

module.exports = {
    index,
    store,
    login,
};