// Required Packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
            updateEmployee();
            break;
        default:
            console.log('Something went wrong in the useMenu switch...')
    }
}

// Add a department
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
                const sql = `INSERT INTO department (name) VALUES ('${data.newDepartment}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(`Department ${data.newDepartment} added.`);
                });
            });
            presentMenu();
        })
}

// Get a list of departments
let departmentsList = [];
function getDepartmentList() {
    const departmentQuery = 'SELECT name FROM department';
    db.query(departmentQuery, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            const departmentOption = {
                value: i + 1,
                name: results[i].name
            }
            if (!departmentsList.includes(departmentOption)) {
                departmentsList.push(departmentOption)
            }
        }
    });
}

// Add a role
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
            db.connect(function(err) {
                if (err) throw err;
                const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${data.newRole}', '${data.newSalary}', '${data.newRoleDepartment}')`;
                db.query(sql, function (err, result) {
                    if (err) {console.log(err)};
                    console.log(`Role ${data.newRole} added.`);
                });
            });
            presentMenu();
        })
}

// Get a list of roles
let rolesList = [];
function getRoleList() {
    const roleQuery = 'SELECT title FROM role';
    db.query(roleQuery, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            const roleOption = {
                value: i + 1,
                name: results[i].title
            }
            if (!rolesList.includes(roleOption)) {
                rolesList.push(roleOption)
            }
        }
    });
}

// Get a list of managers
let managersList = [{value: 0, name: 'null'}];
function getManagerList() {
    const managerQuery = 'SELECT first_name, last_name FROM employee';
    db.query(managerQuery, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            const managerOption = {
                value: i + 1,
                name: results[i].first_name + ' ' + results[i].last_name
            }
            if (!managersList.includes(managerOption)) {
                managersList.push(managerOption)
            }
        }
    });
}

// Add an employee
function addEmployee() {
    getRoleList();
    getManagerList();
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newFirstName',
                message: 'What is the employee\'s first name?',
            },
            {
                type: 'input',
                name: 'newLastName',
                message: 'What is the employee\'s last name?',
            },
            {
                type: 'list',
                name: 'newEmployeeRole',
                message: 'What is the employee\'s role?',
                choices: rolesList,
            },
            {
                type: 'list',
                name: 'newManager',
                message: 'Who is the employee\'s manager?',
                choices: managersList,
            },
        ])
        .then((data) => {
            db.connect(function(err) {
                if (err) throw err;
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.newFirstName}', '${data.newLastName}', '${data.newEmployeeRole}', '${data.newManager}')`;
                db.query(sql, function (err, result) {
                    if (err) {console.log(err)};
                    console.log(`Employee ${data.newFirstName} ${data.newLastName} added.`);
                });
            });
            presentMenu();
        })
}

// Get a list of employees
let employeesList = [];
function getEmployeeList() {
    const employeeQuery = 'SELECT first_name, last_name FROM employee';
    db.query(employeeQuery, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            const employeeOption = {
                value: i + 1,
                name: results[i].first_name + ' ' + results[i].last_name
            }
            if (!employeesList.includes(employeeOption)) {
                employeesList.push(employeeOption)
            }
        }
    });
}

// Update an employee
function updateEmployee() {
    getEmployeeList();
    getRoleList();
    inquirer
        .prompt([
            // Necessary for functionality
            {
                type: 'input',
                name: 'necessity',
                message: 'Please hit "Enter"',
            },
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employee do you want to update?',
                choices: employeesList,
            },
            {
                type: 'list',
                name: 'updateEmployeeRole',
                message: 'What is the employee\'s new role?',
                choices: rolesList,
            },
        ])
        .then((data) => {
            db.connect(function(err) {
                if (err) throw err;
                const sql = `UPDATE employee
                SET role_id = ${data.updateEmployeeRole}
                WHERE e_id = ${data.updateEmployee}`;
                db.query(sql, function (err, result) {
                    if (err) {console.log(err)};
                    console.log(`Employee ${data.updateEmployee} updated.`);
                });
            });
            presentMenu();
        })
}

// Run the program
presentMenu();
