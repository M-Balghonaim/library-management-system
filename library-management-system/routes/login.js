const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const sessionMiddleware = require('../middleware/sessionMiddleware');

router.get(
    '/',
    sessionMiddleware.checkLogin,
    loginController.login_get
);

router.post(
    '/',
    sessionMiddleware.checkLogin,
    loginController.login_post
);

module.exports = router;
