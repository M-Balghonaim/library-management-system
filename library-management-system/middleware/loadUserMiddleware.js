const connection = require('typeorm').getConnection();

// Load the user to the request object if user is logged in. This loaded user object will be used in some controllers
exports.load = async function (req, res, next) {
    if (req.session && req.session.userId) {
        // Add the user to the request session object
        req.user = await connection.getRepository('users').findOne({id: req.session.userId});
    }
    next();
};
