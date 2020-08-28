const connection = require('typeorm').getConnection();
const {body, validationResult} = require('express-validator');
const requestify = require('requestify');


exports.books_manage = async function (req, res, next) {
    const userType = req.user.type;
    if (userType !== 'admin' && userType !== 'librarian') {
        return res.status(403).send('Unauthorized');
    }
    const bookRepo = connection.getRepository('Book');
    var allBooks = await bookRepo.find();
    // Sort books by their id (ascending order)
    allBooks.sort((a, b) => a.id - b.id);
    res.render('manage_books', {title: 'Manage Books', user: req.user, books: allBooks});
};

exports.books_search_get = async function (req, res, next) {
    const bookRepo = connection.getRepository('Book');
    var allBooks = await bookRepo.find();
    // Sort books by their id (ascending order)
    allBooks.sort((a, b) => a.id - b.id);
    res.render('search_books', {title: 'Search Books', user: req.user, books: allBooks});
};

exports.books_search_post = [
    // Validate fields
    body('type')
        .trim()
        .exists()
        .custom(function (value, {req}) {
            const validTypes = ['title', 'author', 'isbn'];
            if (validTypes.includes(req.body.type)) {
                return true;
            } else {
                throw new Error(`Invalid search type. Must be one of: ${validTypes.join(', ')}`);
            }
        }),
    body('term')
        .exists().withMessage('Search term must be provided.'),

    // Sanitize fields.
    body('type').escape(),
    body('term').escape(),


    async function (req, res, next) {
        const errors = validationResult(req);

        // If form fields have validation errors.
        if (!errors.isEmpty()) {
            return res.status(400).render('search_books', {
                title: 'Search Books',
                user: req.user,
                errors: errors.array(),
                books: [],
                term: req.body.term
            });
        }

        const bookRepo = connection.getRepository('Book');
        const term = req.body.term;
        // Case insensitive search
        var searchResults = await bookRepo.createQueryBuilder('book')
            .where(`LOWER(book.${req.body.type}) LIKE :term`, { term: `%${ term.toLowerCase() }%` })
            // .where(`LOWER(book.${req.body.type}) = LOWER(:term)`, {term: term})
            .getMany();

        correction = "";

        if (searchResults.length === 0) {
            corrResponse = await requestify.get(`http://${process.env.SPELLCHECKER_HOST || "localhost"}:8081/correct?spelling=${term}`);
            if (corrResponse.body.toLowerCase() !== term.toLowerCase()) {
                correction = corrResponse.body;
            }
        }

        // Sort books by their id (ascending order)
        searchResults.sort((a, b) => a.id - b.id);
        res.render('search_books', {
            title: 'Search Books',
            user: req.user,
            books: searchResults,
            term: req.body.term,
            correction: correction
        });
    }
];
