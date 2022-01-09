const connectToDb = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const db = require('./db/connection');
const { connect } = require('./db/connection');


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
            } else if (response.mainChoices == 'Add new department') {
                addDepartment();
            } else if (response.mainChoices == 'Add new role') {
                addRole();
            } else if (response.mainChoices == 'Add new employee') {
                addEmployee();
            } else if (response.mainChoices == 'Update existing employee') {
                updateEmployee();
            } else if (response.mainChoices == 'Exit') {
                process.exit();
            }
        });
    };

    // Add dep, role, emp.

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

    function addDepartment() {
        
        inquirer
        .prompt([
            {
                message: 'Department name:',
                type: 'input',
                name: 'depName',
            }
        ])
        .then((response) => {
            connectToDb.query('INSERT INTO department (dep_name) VALUES (?)', response.depName, (err, result) => {
                 if (err) console.log(err);

                 console.table('Insert as ID' + result.insertId);

                 startTracking();
            })
        })
    };

    function addRole() {
        console.log('new role added');
        startTracking();
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
            }
        ])
        .then(function (selectedAnswers) {
            connectToDb.connect(function (err) {
                if (err) throw err;

                connectToDb.query(`NSERT INTO employee SET ?`, {
                    first_name: selectedAnswers.newFirstName,
                    last_name: selectedAnswers.newLastName,
                    role_id: selectedAnswers.newEmpRoleId,
                    manager_id: selectedAnswers.newEmpManagerId
                },
                function( err, result) {
                    if (err) throw err;
                    console.log('\n');
                }
                )
            })
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

    function updateEmployee() {
        console.log('Employee info updated');
        startTracking();
    }

    
    startTracking();