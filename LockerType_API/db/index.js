const { Client  } = require("pg");
require("dotenv").config();

const client = new Client ({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.P_PORT,
    host: process.env.HOST,
});

client.connect();

module.exports = client ;


