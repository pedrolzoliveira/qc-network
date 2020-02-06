const User = require('../models/User');
const Token = require('../models/Token');
const Salt = require('../models/Salt');
const bcrypt = require('bcryptjs');
const connection = require('../database/index');

async function index(req, res) {
    try {
        const user = await User.findByPk(req.params.id, {attributes: ['name', 'email']});
        return res.json(user);            
    } catch(err) {
        res.json({error: err.message});
    }
}

async function store(req, res) {

    const t = await connection.transaction();
    try {
        let { name, email, password } = req.body;
        if (!name.trim() || !email.trim() || !password.trim())
            return res.json({ok: false, error: 'campos nulos ou em branco.'});
        if (await User.findOne({where: {email: email}}) == null) {
            
            const saltstring = await Salt.GenerateSalt(15);
            password = await bcrypt.hash(password + saltstring, 10);

            const user = await User.create({
                name, 
                email, 
                password
            }, {transaction: t});

            const salt = await Salt.create({
                user_id: user.id, 
                salt: saltstring
            }, {transaction: t});

            const token = Token.generateToken(user);
            res.cookie('user_session', token, {maxAge: 1000 * 60 * 60 * 24});
            await t.commit();
            return res.json({ok: true, name, email, token: token});
        } 
        return res.json({ok: false, error: "Email já cadastrado!"});   
    } catch(err) {
        await t.rollback();
        res.json({error: err.message});
    }

    
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email.trim() || !password.trim())
            return res.json({ok: false, error: 'campos nulos ou em branco.'});

        const user = await User.findOne({where: {email: email}, attributes: ['id', 'name', 'email', 'password']});

        if (!user) 
            return res.status(400).send({ok: false, error: "Email não cadastrado!"});
        
        const salt = await Salt.findByPk(user.id);
        if (!await bcrypt.compare(password + salt.salt, user.password))
            return res.status(400).send({ok: false, error: "Senha inválida!"});

        let user_return = {name: user.name, email: user.email};
        const token = Token.generateToken(user);
        res.cookie('user_session', token, {maxAge: 1000 * 60 * 60 * 24});
        return res.json({ok: true, user_return, token: token});
    } catch(err) {
        res.json({ok: false, error: err.message});
    }
}

async function logout(req, res) {
    try {
        const token = req.cookies['user_session'];
        if (!token) return res.json({ok: true});
        const solved = Token.solveToken(token);
        //adicionando a lista negra
        const retorno = await Token.create({token: token, due_date: solved.exp});
        res.clearCookie('user_session');
        return res.json({ok: true});
    } catch(err) {
        console.error(err);
        return res.json({ok: false, error: err.message});
    }
}

module.exports = {
    index,
    store,
    login,
    logout
};