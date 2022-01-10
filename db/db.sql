SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM emps;

-- --selecting all roles and this is the data you will you get
SELECT roles.id AS Role_Id, roles.title AS Job_title, roles.salary AS Salary, departments_id as Department_id FROM roles JOIN departments ON departments.id = department_id;

-- --selecting all employees and this is the data you will get
SELECT employees.id, employees.first_name, employees.last_name, roles.title AS Role_title, roles.dep_id, roles.salary, employees.manager_id