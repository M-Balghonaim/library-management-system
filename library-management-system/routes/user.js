var express = require('express');
var router = express.Router();
const sessionMiddleware = require('../middleware/sessionMiddleware');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');
const userController = require('../controllers/user');


router.get(
    '/profile/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    userController.profile_update_get
);

router.post(
    '/profile/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    userController.profile_update_post
);

router.get(
    '/profile/delete/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    userController.profile_delete
);

module.exports = router;
