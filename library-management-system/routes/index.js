const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');


/* GET home page. */
router.get('/',
    loadUserMiddleware.load,
    indexController.index_get
);

module.exports = router;
