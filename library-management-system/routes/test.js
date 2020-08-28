const express = require('express');
const router = express.Router();
const testController = require('../controllers/test');


router.get('/', testController.load_test_data);

module.exports = router;
