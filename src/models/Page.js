class Page {
    constructor (req) {
        cookie = req.headers.cookie;
    }
    GetCookie(name) {
        const AllCookies = this.cookie.split(';').map(cookie => cookie.trim());
        const Cookie = AllCookies.find(element => element.substring(0, name.length) == name);
        if (!Cookie)
            return undefined;
        return Cookie.split('=')[1];
    }
}





module.exports = Page;