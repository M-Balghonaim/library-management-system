var {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    // "User" is taken by postgres by default, so we use "Users" instead.
    name: 'Users',
    columns: {
        id: {
            type: 'integer',
            primary: true,
            generated: 'increment'
        },
        email: {
            type: 'character varying',
            unique: true,
            length: 255,
            nullable: false,
        },
        password: {
            type: 'character varying',
            nullable: false
        },
        name: {
            type: 'character varying',
            length: 75,
            nullable: true
        },
        phone_number: {
            type: 'character varying',
            nullable: false,
            length: 35
        },
        address: {
            type: 'character varying',
            nullable: false,
            length: 255
        },
        date_of_birth: {
            type: 'date',
            nullable: false
        },
        type: {
            type: 'character varying',
            enum: ['user', 'admin', 'librarian'],
            default: 'user'
        },
        emailConfirmed: {
            type: 'boolean',
            default: false
        },
        creation_date: {
            type: 'timestamp',
            nullable: false
        }
    }
});
