use emps;
INSERT INTO departments (dep_name) 
VALUES 
('testings facilities'),
('nursing facilities');

INSERT INTO roles (title, salary, dep_id)
VALUES
('main guy', 4.00, 22),
('other guy', 20000.00, 12)

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('test', 'subject', 4, 300),
('second', 'test', 4, 400),
('third', 'test', 3, 200)