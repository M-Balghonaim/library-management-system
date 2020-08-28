const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservations');
const sessionMiddleware = require('../middleware/sessionMiddleware');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');

router.get(
    '/',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    reservationsController.reservations_get
);

router.get(
    '/manage',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    reservationsController.reservations_manage
);

module.exports = router;
