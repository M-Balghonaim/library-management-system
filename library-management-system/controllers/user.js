const {body, validationResult} = require('express-validator');
const connection = require('typeorm').getConnection();

// userProfile is not the same as user. User is the currently logged in user, userProfile is the user account
// being updated. This only makes since admins can update other user's accounts.

exports.profile_update_get = async function (req, res, next) {
    // Loading the user instead of using the one loaded in the req object because this might be an admin
    // performing a change to someone else's account.
    const userRepo = connection.getRepository('Users');
    const user = await userRepo.findOne({id: req.params.id});
    // Only admins and account owners should be able to get here
    if (req.user.type === 'admin' || req.user.id === parseInt(req.params.id)) {
        res.render('profile_form', {title: 'Profile', userProfile: user, user: req.user});
    } else {
        return res.status(403).send('Unauthorized');
    }

};


exports.profile_update_post = [

    // Validate fields.
    body('name')
        .trim()
        .exists()
        .isLength({min: 2}).withMessage('Name must be more than 1 character.')
        .isLength({max: 70}).withMessage('Name cannot be more than 70 characters.')
        .isString().withMessage('The name field must be a string.'),
    body('date_of_birth', 'Invalid date of birth')
        .exists()
        .isISO8601(),
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
    body('type')
        .trim()
        .custom(function (value, {req}) {
            const validTypes = ['user', 'librarian', 'admin', ''];
            if (validTypes.includes(req.body.type)) {
                return true;
            } else {
                throw new Error(`Invalid account type. Must be one of: ${validTypes.join(', ')}`);
            }
        }),

    // Sanitize input.
    body('name').escape(),
    body('date_of_birth').toDate(),
    body('phone_number').escape(),
    body('type').escape(),



    // Handle request.
    async function (req, res, next) {
        const errors = validationResult(req);

        var newUserData = {
            name: req.body.name,
            date_of_birth: req.body.date_of_birth,
            phone_number: req.body.phone_number,
            address: req.body.address,
        };

        // Only update the account type if the user currently logged in is an admin
        if (req.user.type === 'admin') {
            newUserData.type = req.body.type || 'user';
        }

        // If form fields have validation errors.
        if (!errors.isEmpty()) {
            return res.render('profile_form', {userProfile: newUserData, user: req.user, errors: errors.array()});
        }

        const userRepository = connection.getRepository("Users");

        await userRepository.update(req.params.id, newUserData);
        const updatedUser = await userRepository.findOne({id: req.params.id});

        res.render('profile_form', {title: 'Profile', userProfile: updatedUser, user: req.user, notification: 'Updated successfully!'});
    }
];

exports.profile_delete = async function (req, res, next) {
    // Loading the user instead of using the one loaded in the req object because this might be an admin
    // performing a change to someone else's account.
    const userRepo = connection.getRepository('Users');
    // Only admins and account owners should be able to get here
    if (req.user.type === 'admin') {
        await userRepo.delete({id: req.params.id});
        if (req.user.id === parseInt(req.params.id)) {
            res.redirect('/logout');
        } else {
            res.redirect('/users/manage')
        }
    } else {
        return res.status(403).send('Unauthorized');
    }

};
