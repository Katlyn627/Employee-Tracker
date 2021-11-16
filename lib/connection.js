const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: "",
    user: "root",
    password: "password",
    database: "employee-tracker"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

module.exports = connection;