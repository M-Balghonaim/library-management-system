const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const loadUserMiddleware = require('../middleware/loadUserMiddleware');
const sessionMiddleware = require('../middleware/sessionMiddleware');


// Add a new book (GET). This just gets the form.
router.get(
    '/add',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    bookController.book_add_get
);

// Add a new book (POST). This is when the form is submitted
router.post(
    '/add',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    bookController.book_add_post
);

// Edit a new book (GET). This will render a page w/ pre-populated fields
router.get(
    '/edit/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    bookController.book_edit_get
);

// Edit an existing book (POSt)
router.post(
    '/edit/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    bookController.book_edit_post
);

// Edit an existing book (POSt)
router.get(
    '/delete/:id',
    sessionMiddleware.checkLogin,
    loadUserMiddleware.load,
    bookController.book_delete
);


module.exports = router;
