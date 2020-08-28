const connection = require('typeorm').getConnection();


exports.manage_users = async function (req, res, next) {
    const userType = req.user.type;
    if (userType !== 'admin') {
        return res.status(403).send('Unauthorized');
    }
    const userRepo = connection.getRepository('Users');
    const allUsers = await userRepo.find();
    // Sort users by their id (ascending order)
    allUsers.sort((a, b) => a.id - b.id);
    res.render('manage_users', {title: 'Manage Users', user: req.user, users: allUsers});
};
