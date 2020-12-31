// npm's to require
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// creating mysql connection to db
var connection = mysql.createConnection(
    {
        host: "localhost",

        port: 3030,

        user: "root",

        password: "Bi9602689!",
        database: "employee_DB"
    });
connection.connect(function(err){
    if (err) throw err;
    chooseRole();
});

    function chooseRole(){
        inquirer.prompt({

            name: 'intitialQuestions',
            type: "list",
            message: "Please select what you would like to do.",
            choices: [
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles",
                "Exit"
            ]
        }).then((answer) =>{
            switch (answer.intitialQuestions) {
                case "Add departments, roles, employees":
                    addFunc();
                    break;

                    case "View departments, roles, employees":
                        viewFunc();
                        break;

                    case "Update employee roles":
                        updateFunc();
                        break;

                    case "Exit":
                     console.log("Connection ended.")
                     connection.end();
            }
        });
    };