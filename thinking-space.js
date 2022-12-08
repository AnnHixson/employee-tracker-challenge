// Required Packages
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Express Setup
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'NsUTnA46>20iG!',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

// Functionality

    // Present Menu
function presentMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'What would you like to do?',
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
            }
        ])
        .then((data) => {
            useMenu(data);
        })
}

function useMenu({ menu }) {
    switch (menu) {
        // Selection: View All Departments
        case "View all departments":
            db.query('SELECT id AS Department_ID, name AS Department FROM department', function (err, results) {
                console.table(`
                `, results);
            });
            presentMenu();
            break;
        // Selection: View All Roles
        case "View all roles":
            db.query('SELECT role.id AS Role_ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM department LEFT JOIN role ON department.id = role.department_id ORDER BY role.id', function (err, results) {
                console.table(`
                `, results);
            });
            presentMenu();
            break;
        // Selection: View All Employees
        case "View all employees":
            db.query('SELECT A.e_id AS Employee_ID, A.first_name AS First_Name, A.last_name AS Last_Name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary, B.first_name AS Manager FROM employee A JOIN role ON A.role_id = role.id JOIN department on role.department_id = department.id LEFT JOIN employee B ON A.manager_id = B.e_id ORDER BY A.e_id', function (err, results) {
                console.table(`
                `, results);
            });
            presentMenu();
            break;
        // Selection: Add A Department
        case "Add a department":
            addDepartment();
            break;
        // Selection: Add A Role
        case "Add a role":
            addRole();
            break;
        // Selection: Add An Employee
        case "Add an employee":
            addEmployee();
            break;
        // Selection: Update An Employee Role
        case "Update an employee role":
            break;
        default:
            console.log('Something went wrong in the useMenu switch...')
    }
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'What is the name of the department?',
            },
        ])
        .then((data) => {
            db.connect(function(err) {
                if (err) throw err;
                console.log('step 1 = yes');
                const sql = `INSERT INTO department (name) VALUES ('${data.newDepartment}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(`Department ${data.newDepartment} added.`);
                });
            });
            presentMenu();
        })
}

let departmentsList = [];
function getDepartmentList() {
    const departmentQuery = 'SELECT name FROM department';
    db.query(departmentQuery, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            const departmentOption = {
                value: i + 1,
                name: results[i].name
            }
            departmentsList.push(departmentOption)
        }
    });
}



function addRole() {
    getDepartmentList();
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'newSalary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'newRoleDepartment',
                message: 'What department does the role belong to?',
                choices: departmentsList,
            },
        ])
        .then((data) => {
            let departmentId = 2;
            for (let i = 0; i < departmentsList.length; i++) {
                if (data.newRoleDepartment === departmentsList[i].name) {
                    console.log('match found');
                    let departmentId = departmentsList[i].value;
                    // return departmentId;
                } else {
                    console.log('break time');
                    let departmentId = 3;
                    // return departmentId
                }
            }
            
            // getDepartmentId(data);
            // console.log(data.newRoleDepartment.departmentsList.value);
            db.connect(function(err) {
                if (err) throw err;
                console.log('step 1 = yes');
                const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${data.newRole}', '${data.newSalary}', '${departmentId}')`;
                db.query(sql, function (err, result) {
                    if (err) {console.log(err)};
                    console.log(`Role ${data.newRole} added.`);
                });
            });
            presentMenu();
        })
}

function getDepartmentId(data) {
    const departmentQuery = 'SELECT name FROM department';
    
    db.query(departmentQuery, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            
            const departmentOption = {
                value: i + 1,
                name: results[i].name
            }
            let departmentId = departmentOption.value

            if(data.newRoleDepartment === departmentOption.name) {
                return console.log('match found')
                // return departmentId = departmentOption.value
            } else if(err) {
                console.log(err)
            } else {
                let departmentId = 3
                return departmentId
            }
            
        }

    });

}

function addEmployee() {}

function updateEmployee() {}

presentMenu();

// Closing Lines
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
