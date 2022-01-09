CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(20) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    dep_id INTEGER
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
);

