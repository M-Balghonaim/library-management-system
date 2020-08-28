const connection = require('typeorm').getConnection();
const bcrypt = require('bcrypt');


// Load test fixtures
exports.load_test_data = async function (req, res, next) {
    console.log('Loading test data...');

    const admin = {
        name: 'admin',
        email: 'admin@admin.ca',
        password: await bcrypt.hash('admin2121!', 10),
        date_of_birth: new Date(),
        creation_date: new Date(),
        phone_number: '7787787788',
        address: 'some address',
        type: 'admin',
    };

    const librarian = {
        name: 'lib',
        email: 'lib@lib.ca',
        password: await bcrypt.hash('lib2121!', 10),
        date_of_birth: new Date(),
        creation_date: new Date(),
        phone_number: '7787787788',
        address: 'some address',
        type: 'librarian',
    };

    const user = {
        name: 'user',
        email: 'user@user.ca',
        password: await bcrypt.hash('user2121!', 10),
        date_of_birth: new Date(),
        creation_date: new Date(),
        phone_number: '7787787788',
        address: 'some address',
        type: 'user',
    };

    const userRepo = connection.getRepository('Users');
    const checkExists = await userRepo.findOne({email: admin.email});

    if (checkExists) {
        res.redirect('/');
        return
    }

    await userRepo.save(admin);
    await userRepo.save(librarian);
    await userRepo.save(user);


    const book1 = {
        title: 'The Alchemist',
        author: `Paulo Coelho`,
        edition: 1,
        isbn: '9780061122415',
        copies: 1,
        status: 'available'
    };

    const book2 = {
        title: 'Harry Potter',
        author: 'Joanne Rowling',
        edition: 1,
        isbn: '9781408855652',
        copies: 3,
        status: 'available'
    };

    const book3 = {
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        edition: 1,
        isbn: '1338323644',
        copies: 1,
        status: 'available'
    };

    const bookRepo = connection.getRepository('Book');

    await bookRepo.save(book1);
    await bookRepo.save(book2);
    await bookRepo.save(book3);

    res.redirect('/');
};
