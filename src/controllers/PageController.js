async function Home(req, res) {
    try {
        if (req.IsAuth)
            return res.render('home');
        return res.render('index');
    } catch(err) {
        console.error(err);
        return res.render('error');
        
    }
}

async function Login(req, res) {
    try {
        if (!req.IsAuth)
            return res.render('login');
        return res.redirect('/');
    } catch(err) {
        console.error(err);
        return res.render('error');
    }
}

module.exports = {
    Home,
    Login
};