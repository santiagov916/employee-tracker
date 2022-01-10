use emps;
INSERT INTO departments (id, dep_name) 
VALUES 
(1, 'Jobsite Employees'),
(2, 'Machine Operators'),
(3, 'Marketing'),
(4, 'Customer service'),
(5, 'Sales'),
(6, 'HR'),
(7, 'Tech'),
(8, 'Maintenence');

INSERT INTO roles (id, title, salary, dep_id)
VALUES
(1, 'Manager', 70000.00, 1),
(2, 'Assistant Manager', 60000.00, 2),
(3, 'Supervisor', 50000.00, 3),
(4, 'Team member', 30000.00, 1),
(5, 'Hiring Servicist', 40000.00, 4),
(6, 'Software Developer', 60000.00, 7),
(7, 'Janitor', 30000.00, 8),
(8, 'Facilities maintenence', 34000.00, 8),
(9, 'Phone operator', 29000.00, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
(100, 'Marketh', 'Zucketh', 2 , NULL),
(200, 'Smiff', 'Ahh', 1, NULL),
(300, 'Wong Tong',  'Su', 1, 100),
(400, 'Fo', 'Blockay', 4, 100),
(500, 'Dubious', 'Utterus', 5, 100),
(600, 'Aloe', 'Vera', 6, 100),
(700, 'Mooh', 'Hoom', 8, 100),
(800, 'Lolly', 'Gaggles', 7, 100),
(900, 'Dana', 'White', 4, 100),
(1000, 'Omy', 'Goodness', 3, 100);