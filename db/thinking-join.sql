-- Goal:
    -- Employee IDs - employee
    -- First Names - employee
    -- Last Names - employee
    -- Job Titles - role - employee.role_id = role.id
    -- Departments - department - employee.role_id = role.id, role.department_id = department.id
    -- Salaries - role - employee.role_id = role.id
    -- Managers - emloyee - employee.manager_id = employee.id

SELECT A.e_id AS Employee_ID, A.first_name AS First_Name, A.last_name AS Last_Name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary, B.first_name AS Manager 
FROM department, employee A
JOIN role ON department.id = role.department_id 
JOIN employee ON role.id = employee.role_id
JOIN employee B ON A.manager_id = B.e_id
-- ORDER BY A.e_id

-- SELECT A.id, A.first_name, A.last_name, B.first_name AS Manager
-- FROM employee A, employee B
-- WHERE A.manager_id = B.id