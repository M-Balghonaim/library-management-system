const {body, validationResult} = require('express-validator');
const connection = require('typeorm').getConnection();
const bcrypt = require('bcrypt');


exports.register_get = function (req, res, next) {
    res.render('register_form');
};

exports.register_post = [
    // Validate fields.
    body('name')
        .trim()
        .exists()
        .isLength({min: 2}).withMessage('Name must be more than 1 character.')
        .isLength({max: 70}).withMessage('Name cannot be more than 70 characters.')
        .isString().withMessage('The name field must be a string.'),
    body('email')
        .trim()
        .exists()
        .isEmail().withMessage('Invalid email address.'),
    body('date_of_birth', 'Invalid date of birth')
        .exists()
        .isISO8601(),
    body('password')
        .exists()
        .isAlphanumeric().withMessage('Password must be alphanumeric.')
        .isLength({min: 8}).withMessage('Password must be more than 8 characters.')
        .isLength({max: 35}).withMessage('Password cannot be more than 35 characters.')
        .custom(function (value, {req}) {
            if (value !== req.body.confirmPassword) {
                throw new Error('Passwords do not match.');
            } else {
                return true;
            }
        }),
    body('phone_number')
        .trim()
        .exists()
        .isLength({min: 7}).withMessage('Phone number must be more than 6 characters.')
        .isLength({max: 35}).withMessage('Phone number cannot be more than 35 characters.')
        .isNumeric().withMessage('Username must not have non-numeric characters.'),
    body('address')
        .exists()
        .isLength({min: 3}).withMessage('Password must be more than 2 characters.')
        .isLength({max: 255}).withMessage('Password cannot be more than 255 characters.'),

    // Sanitize input.
    body('name').escape(),
    body('email').escape(),
    body('date_of_birth').toDate(),
    body('password').escape(),
    body('phone_number').escape(),


    // Handle request.
    async function (req, res, next) {
        const errors = validationResult(req);

        var newUserData = {
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            date_of_birth: req.body.date_of_birth,
            creation_date: new Date(),
            phone_number: req.body.phone_number,
            address: req.body.address,
            type: 'user',
        };

        // If form fields have validation errors.
        if (!errors.isEmpty()) {
            return res.render('register_form', {user: newUserData, errors: errors.array()});
        }

        const userRepository = connection.getRepository("Users");
        userRepository.save(newUserData)
            .then(function (user) {
                // If all goes well.
                req.session.userId = user.id;
                req.session.isLoggedIn = true;
                req.session.emailConfirmed = user.emailConfirmed;
                res.redirect('/');
            })
            .catch(function (error) {
                // If one of the unique fields already exists.
                // Error code "23505" means duplicate unique key constraint was violated.
                var errMessage;
                if (error.code === "23505") {
                    if (error.detail.includes('email')) {
                        errMessage = `Email address "${req.body.email}" is already taken.`;
                    } else {
                        errMessage = `Username "${req.body.username}" is already taken.`;
                    }
                    return res.render('register_form', {user: newUserData, errors: [{msg: errMessage}]});
                }
                // Other database errors are just handled by the error handler middleware in app.js
                var err = new Error();
                err.status = 503;
                return next(err);
            });
    }
];


