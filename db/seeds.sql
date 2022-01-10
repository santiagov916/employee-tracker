use emps;
INSERT INTO departments (id, dep_name) 
VALUES 
(1,'testings facilities'),
(2, 'nursing facilities'),
(3, 'marketing'),
(4, 'customer service'),
(5, 'sales');

INSERT INTO roles (id, title, salary, dep_id)
VALUES
(100, 'main guy', 4.00, 1),
(200, 'other guy', 20000.00, 2),
(300, 'Manager', 60000.00, 5),
(400, 'Team membber', 30000.00, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'test', 'subject', 300, 1),
(2, 'third', 'one', 400, 2);