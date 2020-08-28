const {body, validationResult} = require('express-validator');
const connection = require('typeorm').getConnection();

getDateOneWeeksFromNow = (today) => {
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
};

exports.reservation_add = async function (req, res, next) {
    const reservationRepo = connection.getRepository('Reservation');
    // Check if user has 5 reservations
    const userReservations = await reservationRepo.find({reserved_by: req.session.userId});
    if (userReservations.length > 5) {
        req.session.notification = `You can't have more than  five books on hold!`;
        res.redirect('/reservations');
    } else {
        await reservationRepo.save({
            reservation_date: new Date(),
            reserved_by: req.session.userId,
            book: req.params.id
        });
        req.session.notification = `Reservation added!`;
        res.redirect('/reservations');
    }
};

exports.reservation_cancel = async function (req, res, next) {
    const reservationRepo = connection.getRepository('Reservation');
    const reservation = await reservationRepo.findOne({id: req.params.id});
    await reservationRepo.delete({id: req.params.id});
    if (reservation) {
        if (reservation.reserved_by.id !== req.session.userId) {
            req.session.notification = `Reservation canceled!`;
            return res.redirect('/reservations/manage');
        }
    }
    req.session.notification = `Reservation canceled!`;
    res.redirect('/reservations');
};

exports.reservation_issue = async function (req, res, next) {
    const reservationRepo = connection.getRepository('Reservation');
    await reservationRepo.update(req.params.id, {
        issue_date: new Date(),
        is_issued: true,
        due_date: getDateOneWeeksFromNow(new Date()),
    });
    req.session.notification = `Reservation issued!`;
    res.redirect('/reservations/manage');
};
