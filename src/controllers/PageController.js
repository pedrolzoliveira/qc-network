async function Index(req, res) {
    try {
        res.render('index');
    } catch(err) {

    }
}

async function Home(req, res) {
    try {

    } catch(err) {
        
    }
}

async function Login(req, res) {
    try {
        res.render('login');
    } catch(err) {
        
    }
}

module.exports = {
    Index,
    Home,
    Login
};