var express = require('express');
var router = express.Router();
const sessionMiddleware = require('../middleware/sessionMiddleware');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');
const usersController = require('../controllers/users');


router.get(
    '/manage',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    usersController.manage_users
);


module.exports = router;
