// npm's to require
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// creating mysql connection to db
var connection = mysql.createConnection(
    {
        host: "localhost",

        port: 3005,

        user: "root",

        password: "Bi9602689",
        database: "employee_DB"
    });