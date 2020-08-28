const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrow');
const sessionMiddleware = require('../middleware/sessionMiddleware');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');

router.get(
    '/return/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    borrowController.return_get
);

module.exports = router;
