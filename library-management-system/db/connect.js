const typeorm = require('typeorm');

const createConnection = async function () {
    await typeorm.createConnection({
        type: "postgres",
        host: process.env.DOCKER_DB_HOST || "localhost",
        port: 5432,
        username: "postgres",
        password: "password",
        database: "lms-db",
        synchronize: true,
        logging: false,
        entities: [
            // Entities must be registered here
            require("../entity/users"),
            require("../entity/book"),
            require("../entity/reservation")
        ]
    }).then(async function (connection) {
        // Log relevant db connection information upon startup
        const db = connection.options.database;
        const host = connection.options.host;
        const port = connection.options.port;
        console.log(`Successfully connected to database "${db}" at host "${host}" and port ${port}.`);
    }).catch(function (error) {
        console.log("Error: ", error);
    });
};

createConnection();
