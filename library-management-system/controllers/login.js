const {body, validationResult} = require('express-validator');
const {sanitizeBody} = require('express-validator');
const connection = require('typeorm').getConnection();
const bcrypt = require('bcrypt');

exports.login_get = function (req, res, next) {
    res.render('login_form', {title: 'Log in'});
};


exports.login_post = [

    // Validate fields
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email address.'),
    body('password')
        .exists().withMessage('Password must be provided.'),

    // Sanitize fields.
    body('email').escape(),
    body('password').escape(),

    // Handle request.
    async function (req, res, next) {
        const errors = validationResult(req);

        // If form fields have validation errors.
        if (!errors.isEmpty()) {
            return res.status(400).render('login_form', {title: 'Log in', user: undefined, errors: errors.array()});
        }

        // Authenticate user and create session if successful.
        const usersRepo = connection.getRepository('Users');
        const email = req.body.email;
        var where =  where = {email: email};
        const user = await usersRepo.findOne({where: where});

        // If user with provided email is found
        if (user) {
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            // If provided password is correct
            if (correctPassword) {
                // If correct, assign session and redirect to home page.
                req.session.userId = user.id;
                req.session.isLoggedIn = true;
                req.session.userConfirmed = user.emailConfirmed;
                return res.redirect('/');
            }
        }
        return res.render('login_form', {title: 'Log in', user: undefined, errors: [{msg: 'Incorrect email or password.'}]});
    }
];
