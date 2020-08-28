var express = require('express');
var router = express.Router();
const registerController = require('../controllers/register');
const sessionMiddleware = require('../middleware/sessionMiddleware');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');

router.get(
    '/',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    registerController.register_get
);

router.post(
    '/',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    registerController.register_post
);

module.exports = router;

