use emps;
INSERT INTO department
    (name) 
VALUES 
('Jobsite Employees'),
('Machine Operators'),
('Engineering'),
('Customer service');


INSERT INTO role
    (title, salary, department_id)
VALUES
('Manager', 70000.00, 3),
('Assistant Manager', 60000.00, 1),
('Supervisor', 50000.00, 1),
('Team member', 30000.00, 1),
('Hiring Servicist', 40000.00, 4),
('Lead Engineer', 70000.00, 3),
('Janitor', 30000.00, 1),
('Facilities maintenence', 34000.00, 2),
('Phone operator', 29000.00, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
('Marketh', 'Zucketh', 2 , NULL),
('Smiff', 'Ahh', 1, NULL),
('Wong Tong',  'Su', 1, 2),
('Fo', 'Blockay', 4, 1),
('Dubious', 'Utterus', 5, NULL),
('Aloe', 'Vera', 6, 3),
('Mooh', 'Hoom', 8, NULL),
('Lolly', 'Gaggles', 7, 5),
('Dana', 'White', 4, NULL),
('Omy', 'Goodness', 3, 7);