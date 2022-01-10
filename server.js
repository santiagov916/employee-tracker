const connectToDb = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const db = require('./db/connection');

    // main function of the program

function startTracking () {

        // initial startup

        inquirer
        .prompt(
            {
            message: 'What would you like to do?',
            type: 'list',
            name: 'mainChoices',
            choices: [
                'View departments',
                'View roles',
                'View employees',
                'View employees by department',
                'View managers',
                'Department Budget',
                'Add new department',
                'Add new role',
                'Add new employee',
                'Update existing employee',
                'Update existing employee manager',
                'Exit'
                ]
            }
        )
        .then ((response) => {
            if (response.mainChoices == 'View departments') {
                openDepartment();
            } else if (response.mainChoices == 'View roles') {
                openRoles();
            } else if (response.mainChoices == 'View employees') {
                openEmployees();
            } else if (response.mainChoices == 'View employees by department') {
                openDepByEmp();
            } else if (response.mainChoices == 'View managers') {
                openManagers();
            } else if (response.mainChoices == 'Department Budget') {
                openBudget()
            } else if (response.mainChoices == 'Add new department') {
                addDepartment();
            } else if (response.mainChoices == 'Add new role') {
                addRole();
            } else if (response.mainChoices == 'Add new employee') {
                addEmployee();
            } else if (response.mainChoices == 'Update existing employee') {
                updateEmployee();
            } else if (response.mainChoices == 'Update existing employee        manager') {
                updateEmpManager();
            } else if (response.mainChoices == 'Exit') {
                process.exit();
            }
        });
    };

    // Add dep, role, emp.

    function addDepartment() {
        
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'depName',
                message: 'Department name:',
            },
            {
                type: 'list',
                name: 'backToMain',
                message: 'Department added, PRESS ENTER',
                choices: ['Main Menu']
            }
        ])
        .then((response) => {
            connectToDb.connect(function (err) {
                if (err) throw err;

                connectToDb.query(`INSERT INTO departments SET ?`, {
                    dep_name: response.depName
                },
                function (err, result) {
                    if (err) throw err;
                    console.log('\n');
                });
            })
            if (response.backToMain === 'Main Menu') {
                startTracking();
            };
        })
    };

    function addRole() {
        inquirer.prompt([
            {
             type: 'input',
             name: 'newRoleTitle',
             message: 'What is the title of the new role?'
            },
            {
                type: 'input',
                name: 'newRoleSalary',
                message: 'What is the salary of the new role?'
            },
            {
                type: 'input',
                name: 'newRoleDepId',
                message: 'What is the department ID for the new role?'
            },
            {
                type: 'list',
                name: 'backToMainMenu',
                message: 'New Role added PRESS ENTER',
                choices: ['Main Menu']
            }
        ])
        .then((response) => {
            connectToDb.connect(function (err) {
                if (err) throw err;
 
                connectToDb.query(`INSERT INTO roles SET ?`, {
                    title: response.newRoleTitle,
                    salary: response.newRoleSalary,
                    dep_id: response.newRoleDepId
                },
                 function (err, result) {
                     if (err) throw err;
                     console.log('\n')
                 })
            })
            if (response.backToMainMenu === 'Main Menu') {
                startTracking();
            };
        })
     }

    function addEmployee() {
        
        inquirer.prompt([
            {
            type: 'input',
            name: 'newFirstName',
            message: '=========== add an employee =========',
            message: 'First name? :'
            },
            {
                type: 'input',
                name: 'newLastName',
                message: 'Last name? :'

            },
            {
                type: 'input',
                name: 'newEmpRoleId',
                message: 'What is your role ID? :'
            },
            {
                type: 'input',
                name: 'newEmpManagerId',
                message: 'What is the ID of your manager? :'
            },
            {
                type: 'list',
                name: 'backToMain',
                message: 'New employee added PRESS ENTER',
                choices: ['Main Menu']
            }
        ])
        .then(function (response) {
            connectToDb.connect(function (err) {
                if (err) throw err;

                connectToDb.query(`INSERT INTO employees SET ?`, {
                    first_name: response.newFirstName,
                    last_name: response.newLastName,
                    role_id: response.newEmpRoleId,
                    manager_id: response.newEmpManagerId
                },
                function( err, result) {
                    if (err) throw err;
                    console.log('\n');
                })
            })
            if (response.backToMain === 'Main Menu') {
                startTracking();
            }
        })
    }

    // view existing dep, role, emp.

    function openDepartment() {

        connectToDb.connect(function (err) {
            if (err) throw err;

            connectToDb.query(`SELECT * FROM departments`, function (err, result) { 
            if (err) console.log(err);
        
            console.table (result);
        
        })
        startTracking();
    })

    }

    function openRoles() {
        
        connectToDb.connect(function (err) {
            if (err) throw err;

            connectToDb.query(`SELECT * FROM roles`, function (err,
                result) {
                    if (err) console.log(err);

                    console.table (result);
                })
        })
        startTracking();
    }

    function openEmployees() {

        connectToDb.connect(function (err) {
            if (err) throw err;
            
            connectToDb.query(`SELECT * FROM employees`, function (err,
                result) {
                    if (err) console.log(err);

                    console.table (result);
                })
                startTracking();
        })
    }

    function openManagers() {
        connectToDb.connect(function (err) {
            if (err) throw err;

            connectToDb.query(`SELECT * FROM employees WHERE role_id = 1`, function (err, result) {
                if (err) throw err;
                console.log('\n');
                console.table(result);
            });
        })

        inquirer.prompt({
            type: 'list',
            name: 'backToMain',
            message: 'Here all the Managers, PRESS ENTER TO RETURN TO  MAIN MENU',
            choices: ['Main menu']
        }). then (function (response) {
            if (response.backToMain === 'Main menu') {
                startTracking();
            };
        });
    };

    function openBudget() {
        connectToDb.connect(function (err) {
            if (err) throw err;

            connectToDb.query(`SELECT departments.id, departments.dep_name, roles.dep_id,
            SUM(roles.salary) AS Department_budget
            FROM departments
            INNER JOIN roles ON roles.dep_id = departments.id
            GROUP BY departments.id`, function (err, result) {
                if (err) throw err;
                console.log('\n');
                console.table(result);
            });
        })

        inquirer.prompt({
            type: 'list',
            name: 'backToMain',
            message: 'Here is a budget of each department, PRESS ENTER TO RETURN TO MAIN MENU',
            choices: ['Main menu']
        }).then(function (response) {
            if (response.backToMain === 'Main menu') {
                startTracking();
            };
        });
    };

    function openDepByEmp() {
        connectToDb.connect(function (err) {
            if (err) throw err;

            connectToDb.query(`SELECT employees.first_name, employees.last_name, employees.role_id, roles.dep_id, departments.dep_name FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.dep_id = departments.id;`, function (err, result) {
                if (err) throw err;
                // console.log('\n');
                console.table(result);
            });
        })
        inquirer.prompt({
            type: 'list',
            name: 'displayAndRetun',
            message: 'Here are all the Employees, PRESS ENTER TO RETURN',
            choices: ['Main Menu']
        }).then (function (response) {
            if (response.displayAndRetun === 'Main Menu') {
                startTracking();
            };
        });
    }

    // update dep, role, emp.

    function updateEmployee() {
    }

    function updateEmpManager() {

    }



    // call function to begin tracking
    startTracking();