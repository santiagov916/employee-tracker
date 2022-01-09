const connectToDb = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');


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
        console.log('employee added');
        startTracking();
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