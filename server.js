const connectToDb = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const db = require('./db/connection');
const logo = require('asciiart-logo');

    // main function of the program

    function startTracking () {

        // logo
        const logoText = logo({ name: 'Employee Tracker '}).render();

        console.log(logoText);

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
                'Department Budget',
                'Add new department',
                'Add new role',
                'Add new employee',
                'Update existing employee',
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
            } else if (response.mainChoices == 'Department Budget') {
                openBudget()
            } else if (response.mainChoices == 'Add new department') {
                addDepartment();
            } else if (response.mainChoices == 'Add new role') {
                addRole();
            } else if (response.mainChoices == 'Add new employee') {
                addEmployee();
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

                connectToDb.query(`INSERT INTO department SET ?`, {
                    name: response.depName
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
                name: 'backToMain',
                message: 'New Role added PRESS ENTER',
                choices: ['Main Menu']
            }
        ])
        .then((response) => {
            connectToDb.connect(function (err) {
                if (err) throw err;
 
                connectToDb.query(`INSERT INTO role SET ?`, {
                    title: response.newRoleTitle,
                    salary: response.newRoleSalary,
                    department_id: response.newRoleDepId
                },
                 function (err, result) {
                     if (err) throw err;
                     console.log('\n')
                 })
            })
            if (response.backToMain === 'Main Menu') {
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

                connectToDb.query(`INSERT INTO employee SET ?`, {
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

    // view existing dep, role, emp., managers, budgets, dep. by emp.

    function openDepartment() {

        connectToDb.connect(function (err) {
            if (err) throw err;

            connectToDb.query(`SELECT department.id, department.name FROM department;`, function (err, result) { 
            if (err) console.log(err);
        
            console.table (result);
        
        })
        startTracking();
    })

    }

    function openRoles() {
        
        connectToDb.connect(function (err) {
            if (err) throw err;

            connectToDb.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;`, function (err,
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
            
            connectToDb.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`, function (err,
                result) {
                    if (err) console.log(err);

                    console.table (result);
                })
                startTracking();
        })
    }

    function openBudget() {
        connectToDb.connect(function (err) {
            if (err) throw err;

            connectToDb.query(`SELECT department.id, department.name, role.department_id,
            SUM(role.salary) AS Department_budget
            FROM department
            INNER JOIN role ON role.department_id = department.id
            GROUP BY department.id`, function (err, result) {
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

            connectToDb.query(`SELECT employee.first_name, employee.last_name, employee.role_id, role.department_id, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;`, function (err, result) {
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

    // call function to begin tracking
    startTracking();