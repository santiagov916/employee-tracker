SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM emps;

-- --selecting all roles and this is the data you will you get
SELECT roles.id AS Role_Id, roles.title AS Job_title, roles.salary AS Salary, departments_id as Department_id FROM roles JOIN departments ON departments.id = department_id;

-- --selecting all employees and this is the data you will get
SELECT employees.id, employees.first_name, employees.last_name, roles.title AS Role_title, roles.dep_id, roles.salary, employees.manager_id;

-- --select an employee from department name
SELECT employees.id AS employees_id, employees.first_name, employees.last_name, employees.role_id, roles.dep_id, departments.dep_name
FROM employees
INNER JOIN roles ON employees.role_id = roles.id
INNER JOIN departments ON roles.dep_id = departments.id;

-- --view budget of each department
SELECT departments.id, departments.dep_name, roles.dep_id,
SUM(roles.salary) AS Department_budget
FROM departments
INNER JOIN roles ON roles.dep_id = departments.id
GROUP BY departments.id;

-- --update employee's manager
SELECT employees.id, employees.manager_id
FROM employees
INNER JOIN roles ON employees.role_id = roles.id;

-- -- update employee role
UPDATE employees SET employees.role_id = 2 WHERE employees.id = 3;

SELECT employees.id, employees.first_name, employees.last_name, employees.role_id FROM employees WHERE employees.role_id = 1;