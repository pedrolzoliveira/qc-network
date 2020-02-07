async function Home(req, res) {
    try {
        if (req.IsAuth)
            return res.render('home', {name: req.user.name});
        return res.render('index');
    } catch(err) {
        console.error(err);
        return res.render('error', {error: err.message});
    }
}

async function Login(req, res) {
    try {
        if (!req.IsAuth)
            return res.render('login');
        return res.redirect('/');
    } catch(err) {
        console.error(err);
        return res.render('error', {error: err.message});
    }
}

async function Error404(req, res) {
    try {
        return res.render('error', {error: 'Page not found'});
    } catch(err) {
        console.error(err);
        return res.render('error', {error: err.message});
    }
}

module.exports = {
    Home,
    Login, 
    Error404
};