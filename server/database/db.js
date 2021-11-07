const mysql = require('mysql')

const db = mysql.createConnection({
    host: "taller5telematica.cwm44prmspog.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "Telematica123",
    database: "covid",
})

module.exports = db;