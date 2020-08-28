var {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'Book',
    columns: {
        id: {
            type: 'integer',
            primary: true,
            generated: 'increment'
        },
        title: {
            type: 'character varying',
            nullable: false,
            length: 255
        },
        author: {
            type: 'character varying',
            length: 255,
            nullable: false
        },
        edition: {
            type: 'integer',
            nullable: false,
        },
        isbn: {
            type: 'character varying',
            nullable: false,
            length: 30
        },
        /*
        Statuses:
        - available: The book is available for reservation.
        - on_hold: The book has been reserved, but not yet issued.
        - borrowed: The book has been issued by a Librarian to the user who placed the reservation.
         */
        status: {
            type: 'character varying',
            enum: ['available', 'on_hold', 'borrowed'],
            default: 'available'
        },
        copies: {
            type: 'integer',
            nullable: false,
        },
    }
});
