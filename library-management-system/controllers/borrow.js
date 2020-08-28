const connection = require('typeorm').getConnection();

exports.return_get = async function (req, res, next) {
    const reservationRepo = connection.getRepository('Reservation');
    await reservationRepo.delete({id: req.params.id});
    const allBorrows = await reservationRepo.find({is_issued: true});
    // Sort reservations by their id (ascending order)
    allBorrows.sort((a, b) => a.id - b.id);
    res.render('manage_borrows', {
        title: 'Manage Borrows',
        user: req.user,
        borrows: allBorrows
    });
};
