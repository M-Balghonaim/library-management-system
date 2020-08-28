const connection = require('typeorm').getConnection();

exports.borrows_get = async function (req, res, next) {
    const reservationRepo = connection.getRepository('Reservation');
    const borrows = await reservationRepo.find({reserved_by: req.session.userId, is_issued: true});
    // Sort reservations by their id (ascending order)
    borrows.sort((a, b) => a.id - b.id);
    res.render('my_borrows', {
        title: 'My Borrowed Books',
        user: req.user,
        borrows: borrows,
    });
};

exports.borrows_manage = async function (req, res, next) {
    const reservationRepo = connection.getRepository('Reservation');
    const allBorrows = await reservationRepo.find({is_issued: true});
    // Sort reservations by their id (ascending order)
    allBorrows.sort((a, b) => a.id - b.id);
    res.render('manage_borrows', {
        title: 'Manage Borrowed Books',
        user: req.user,
        borrows: allBorrows,
    });
};
