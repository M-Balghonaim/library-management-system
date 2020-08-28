const express = require('express');
const router = express.Router();
const borrowsController = require('../controllers/borrows');
const sessionMiddleware = require('../middleware/sessionMiddleware');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');

router.get(
    '/',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    borrowsController.borrows_get
);

router.get(
    '/manage',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    borrowsController.borrows_manage
);


module.exports = router;
