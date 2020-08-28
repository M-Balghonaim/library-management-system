exports.index_get = function (req, res, next) {
    res.render('index', {title: 'Home', user: req.user});
};
