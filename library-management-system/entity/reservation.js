var {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'Reservation',
    columns: {
        id: {
            type: 'integer',
            primary: true,
            generated: 'increment'
        },
        is_issued: {
            type: 'boolean',
            nullable: false,
            default: false
        },
        reservation_date: {
            type: 'date',
            nullable: false
        },
        issue_date: {
            type: 'date',
            nullable: true
        },
        due_date: {
            type: 'date',
            nullable: true
        },
        return_date: {
            type: 'date',
            nullable: true
        },
    },
    relations: {
        reserved_by: {
            target: 'Users',
            type: 'many-to-one',
            joinTable: true,
            eager: true,
            joinColumn: {name: 'reserved_by', referencedColumnName: 'id'},
            onDelete: 'CASCADE'
        },
        book: {
            target: 'Book',
            type: 'many-to-one',
            eager: true,
            joinTable: true,
            joinColumn: {name: 'book', referencedColumnName: 'id'},
            onDelete: 'CASCADE'
        },
    }
});
