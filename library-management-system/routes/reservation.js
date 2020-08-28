const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');
const sessionMiddleware = require('../middleware/sessionMiddleware');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');

// Reservation cancelled by owner, admin, or librarian
router.get(
    '/cancel/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    reservationController.reservation_cancel
);

// Reservation issued by an admin or librarian
router.get(
    '/issue/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    reservationController.reservation_issue
);

router.get(
    '/add/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    reservationController.reservation_add
);

module.exports = router;
