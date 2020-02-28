module.exports = {
    async Home(req, res) {
        try {
            if (req.IsAuth) 
                return res.render('home', {props: {user: req.user}});
            return res.render('index');
        } catch(err) {
            console.error(err);
            return res.render('error', {error: err.message});
        }
    },

    async Login(req, res) {
        try {
            if (!req.IsAuth)
                return res.render('login');
            return res.redirect('/');
        } catch(err) {
            console.error(err);
            return res.render('error', {error: err.message});
        }
    }, 

    async Tournaments(req, res) {
        try {
            return res.render('tournaments');
        } catch(err) {
            console.error(err);
            return res.render('error', {error: err.message});
        }
    },

    async Error404(req, res) {
        try {
            return res.render('error', {error: 'Page not found'});
        } catch(err) {
            console.error(err);
            return res.render('error', {error: err.message});
        }
    },

    async PlayerCreate(req, res) {
        try {
            
        } catch(err) {
            console.error(err);
            return res.render('error', {error: err.message});
        }
    },
};