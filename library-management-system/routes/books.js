const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const sessionMiddleware = require('../middleware/sessionMiddleware');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');


router.get(
    '/manage',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    booksController.books_manage
);


// Non-logged in users should be able to search
router.get(
    '/search',
    loadUserMiddleware.load,
    booksController.books_search_get
);

router.post(
    '/search',
    loadUserMiddleware.load,
    booksController.books_search_post
);

module.exports = router;
