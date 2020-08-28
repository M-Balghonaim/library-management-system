// If the user is not logged in, redirect them to the login page
exports.checkLogin = async function (req, res, next) {
    if (req.session && req.session.userId) {
        const original_url = req.originalUrl;
        if (original_url === '/login' || original_url === '/register') {
            res.redirect(req.url);
        } else {
            next();
        }
    } else {
        const original_url = req.originalUrl;
        if (original_url === '/login' || original_url === '/register') {
            next();
        } else {
            res.redirect('/login');
        }
    }
};
