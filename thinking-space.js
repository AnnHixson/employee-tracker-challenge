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
            db.query('SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary FROM department JOIN role ON department.id = role.department_id JOIN employee ON role.id = employee.role_id ORDER BY employee.id', function (err, results) {
                console.table(`
                `, results);
            });
            presentMenu();
            break;
        // Selection: Add A Department
        case "Add a department":
            break;
        // Selection: Add A Role
        case "Add a role":
            break;
        // Selection: Add An Employee
        case "Add an employee":
            break;
        // Selection: Update An Employee Role
        case "Update an employee role":
            break;
        default:
            console.log('Something went wrong in the useMenu switch...')
    }
}

presentMenu();

// Closing Lines
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
