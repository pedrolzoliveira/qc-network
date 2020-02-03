const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcryptjs');

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
        if (!name.trim() || !email.trim() || !password.trim())
            return res.json({ok: false, error: 'campos nulos ou em branco.'});
        if (await User.findOne({where: {email: email}}) == null) {
            password = await bcrypt.hash(password, 10);
            const user = await User.create( {name, email, password} );
            const token = Token.generateToken(user);
            res.cookie('user_session', token);
            return res.json({ok: true, name, email, token: token});
        } 
        return res.json({ok: false, error: "Email já cadastrado!"});   
    } catch(err) {
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
        
        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ok: false, error: "Senha inválida!"});

        let user_return = {name: user.name, email: user.email};
        const token = Token.generateToken(user);
        res.cookie('user_session', token);
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