async function Home(req, res) {
    try {
        if (req.IsAuth)
            return res.render('home');
        return res.render('index');
    } catch(err) {
        res.send(err.message);
    }
}

async function Login(req, res) {
    try {
        if (!req.IsAuth)
            return res.render('login');
        return res.redirect('/');
    } catch(err) {
        return res.render('error');
    }
}

module.exports = {
    Home,
    Login
};