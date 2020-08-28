const express = require('express');
const router = express.Router();
const logout_controller = require('../controllers/logout');

router.get('/', logout_controller.logout_get);

module.exports = router;
