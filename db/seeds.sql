use emps;
INSERT INTO departments (id, dep_name) 
VALUES 
(NULL,'testings facilities'),
(NULL, 'nursing facilities');

INSERT INTO roles (id, title, salary, dep_id)
VALUES
(NULL, 'main guy', 4.00, 22),
(NULL, 'other guy', 20000.00, 12);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
(NULL, 'test', 'subject', 4, 300),
(NULL, 'third', 'one', 3, 200);