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

    async Recovery(req, res) {
        try {
            return res.render('recovery');
        } catch(err) {
            console.error(err);
            return res.render('error', {error: err.message});
        }
    },

    async Logout(req, res) {
        try {
            return res.render('logout');
        } catch (err) {
            console.log(err);
            return res.render('error', {error: err.message});
        }
    },

    async About(req, res) {
        try {
            return res.render('about');
        } catch (err) {
            console.log(err);
            return res.render('error', {error: err.message});
        }
    },

    async Settings(req, res) {
        try {
            return res.render('settings');
        } catch (err) {
            console.log(err);
            return res.render('error', {error: err.message});
        }
    },

    async Profile(req, res) {
        try {
            return res.render('profile');
        } catch (err) {
            console.log(err);
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

   
};