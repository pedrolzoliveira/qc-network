const Page = require('../models/Page');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


async function Home(req, res) {
    try {
        page = new Page(req);
        if (page.GetCookie('SESSIONPASS') == undefined)
            res.render('index');
    } catch(err) {
        res.send(err.message);
    }
}

async function Login(req, res) {
    try {
        res.render('login');
    } catch(err) {
        
    }
}

module.exports = {
    Home,
    Login
};