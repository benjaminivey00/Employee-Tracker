// npm's to require
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// creating mysql connection to db
var connection = mysql.createConnection(
    {
        host: "127.0.0.1",

        port: 3005,

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

    function updateFunc() {
        connection.query("SELECT DISTINCT e.first_name, e.last_name, r.title, r.id FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id;", function(err, res) {
            let updateRolesArray = []
            for (let i = 0; i < res.length; i++) {
                updateRolesArray.push(res[i].title)
            }
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "updateWhich",
                        type: "list",
                        message: "Select what employee role you would like to update.",
                        choices: updateRolesArray
                    }
                ])
                .then((result) => {
                    let updateEmployeeArray = []
                        for (let j = 0; j < updateRolesArray.length; j++) {
                            if (res[j].title === result.updateWhich) {
                                updateEmployeeArray.push(res[j].last_name)
                            }
                        }
                        function updateEmployee() {
                            inquirer
                                .prompt([
                                    {
                                        name: "selectName",
                                        type: "list",
                                        message: "Select the lastname of the employee you would like to update.",
                                        choices: updateEmployeeArray
                                    },
                                    {
                                        name: "selectNewRole",
                                        type: "list",
                                        message: "Select the role you would like this employee to have.",
                                        choices: updateRolesArray
                                    }
                                ])
                                .then((response) => {
                                    let roleID;
                                    for (let k = 0; k < updateRolesArray.length; k++) {
                                        if (updateRolesArray[k] === response.selectNewRole) {
                                            roleID = res[k].id
                                        }
                                    }
                                    connection.query("UPDATE employee SET ? WHERE ?",
                                    [{
                                        role_id: roleID
                                    },
                                    {
                                        last_name: response.selectName
                                    }])
                                    chooseRole();
                                });
                        }
                        updateEmployee();
                    
                });
        });
    
    };