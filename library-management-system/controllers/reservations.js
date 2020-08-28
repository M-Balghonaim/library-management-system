const {body, validationResult} = require('express-validator');
const connection = require('typeorm').getConnection();

exports.reservations_get = async function (req, res, next) {
    const reservationRepo = connection.getRepository('Reservation');
    const reservations = await reservationRepo.find({reserved_by: req.session.userId, is_issued: false});
    // Sort reservations by their id (ascending order)
    reservations.sort((a, b) => a.id - b.id);
    // TODO: How I'm handling the nofication here is kind of a hack. It's passed in by the `/reservation` controllers
    const notification = req.session.notification;
    req.session.notification = undefined;
    res.render('my_reservations', {
        title: 'My Reservations',
        user: req.user,
        reservations: reservations,
        notification: notification
    });
};

exports.reservations_manage = async function (req, res, next) {
    const reservationRepo = connection.getRepository('Reservation');
    const reservations = await reservationRepo.find({is_issued: false});
    // Sort reservations by their id (ascending order)
    reservations.sort((a, b) => a.id - b.id);
    res.render('manage_reservations', {
        title: 'Manage Reservations',
        user: req.user,
        reservations: reservations,
    });
};

