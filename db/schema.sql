DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS emp_role;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    dep_name VARCHAR(30)
);

CREATE TABLE emp_role (
    id INTEGER PRIMARY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);

CREATE TABLE emp (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
);