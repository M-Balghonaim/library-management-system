const {body, validationResult} = require('express-validator');
const connection = require('typeorm').getConnection();

exports.book_add_get = async function (req, res, next) {
    const userType = req.user.type;
    if (userType !== 'admin' && userType !== 'librarian') {
        return res.status(403).send('Unauthorized');
    }
    res.render('book_form', {title: 'Add Book', user: req.user});
};

exports.book_add_post = [
    // Validate fields.
    body('title', 'Title must not be empty.')
        .trim()
        .exists()
        .isLength({min: 1}).withMessage('Title must be more than 1 character.')
        .isLength({max: 255}).withMessage('Title must be more less than 256 characters.'),
    body('author', 'Author must not be empty.')
        .trim()
        .exists()
        .isLength({min: 1}).withMessage('Author must be more than 1 character.')
        .isLength({max: 255}).withMessage('Author must be more less than 256 characters.'),
    body('edition', 'Edition must not be empty.')
        .exists()
        .isNumeric().withMessage('Edition must be a number.'),
    body('isbn', 'ISBN must not be empty')
        .trim()
        .exists()
        .isLength({min: 1}).withMessage('ISBN must be more than 1 character.')
        .isLength({max: 255}).withMessage('ISBN must be more less than 31 characters.')
        .isAlphanumeric().withMessage('ISBN must be alphanumeric.'),
    body('copies', 'Number of copies must not be empty.')
        .exists()
        .isNumeric().withMessage('Number of copies must be a number.'),

    // Sanitize
    body('title').escape(),
    body('author').escape(),
    body('edition').escape(),
    body('isbn').escape(),
    body('copies').escape(),

    async function (req, res, next) {
        const userType = req.user.type;
        if (userType !== 'admin' && userType !== 'librarian') {
            return res.status(403).send('Unauthorized');
        }

        const errors = validationResult(req);

        var newBookData = {
            title: req.body.title,
            author: req.body.author,
            edition: req.body.edition,
            isbn: req.body.isbn,
            copies: req.body.copies,
            status: 'available'
        };

        // If form fields have validation errors.
        if (!errors.isEmpty()) {
            return res.render('book_form', {user: newBookData, errors: errors.array()});
        }

        const bookRepo = connection.getRepository('Book');

        bookRepo.save(newBookData)
            .then(function (savedBook) {
                res.redirect('/books/manage');
            })
            .catch(function (error) {
                error.status = 503;
                return next(error);
            });
    }
];

exports.book_edit_get = async function (req, res, next) {
    const userType = req.user.type;
    if (userType !== 'admin' && userType !== 'librarian') {
        return res.status(403).send('Unauthorized');
    }
    const bookRepo = connection.getRepository('Book');
    const book = await bookRepo.findOne({id: req.params.id});

    res.render('book_form', {title: 'Edit Book', user: req.user, book: book});
};

exports.book_edit_post = [
    // Validate fields.
    body('title', 'Title must not be empty.')
        .trim()
        .exists()
        .isLength({min: 1}).withMessage('Title must be more than 1 character.')
        .isLength({max: 255}).withMessage('Title must be more less than 256 characters.'),
    body('author', 'Author must not be empty.')
        .trim()
        .exists()
        .isLength({min: 1}).withMessage('Author must be more than 1 character.')
        .isLength({max: 255}).withMessage('Author must be more less than 256 characters.'),
    body('edition', 'Edition must not be empty.')
        .exists()
        .isNumeric().withMessage('Edition must be a number.'),
    body('isbn', 'ISBN must not be empty')
        .trim()
        .exists()
        .isLength({min: 1}).withMessage('ISBN must be more than 1 character.')
        .isLength({max: 255}).withMessage('ISBN must be more less than 31 characters.')
        .isAlphanumeric().withMessage('ISBN must be alphanumeric.'),
    body('copies', 'Number of copies must not be empty.')
        .exists()
        .isNumeric().withMessage('Number of copies must be a number.'),

    // Sanitize
    body('title').escape(),
    body('author').escape(),
    body('edition').escape(),
    body('isbn').escape(),
    body('copies').escape(),

    async function (req, res, next) {
        const userType = req.user.type;
        if (userType !== 'admin' && userType !== 'librarian') {
            return res.status(403).send('Unauthorized');
        }

        const errors = validationResult(req);

        var bookUpdatedData = {
            title: req.body.title,
            author: req.body.author,
            edition: req.body.edition,
            isbn: req.body.isbn,
            copies: req.body.copies,
            status: 'available',
        };

        // If form fields have validation errors.
        if (!errors.isEmpty()) {
            res.render('book_form', {title: 'Edit Book', user: req.user, book: book});
        }

        const bookRepo = connection.getRepository('Book');
        bookRepo.update(req.params.id, bookUpdatedData)
            .then(function (savedBook) {
                res.redirect('/books/manage');
            })
            .catch(function (error) {
                error.status = 503;
                return next(error);
            });
    }
];

exports.book_delete = async function (req, res, next) {
    const userType = req.user.type;
    if (userType !== 'admin' && userType !== 'librarian') {
        return res.status(403).send('Unauthorized');
    }
    const bookRepo = connection.getRepository('Book');
    await bookRepo.delete({id: req.params.id});
    res.redirect('/books/manage');
};

