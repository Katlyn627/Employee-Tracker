USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ( "role.title", 100000.00, 1),
       ( "role.title", 100000.00, 2),
       ( "role.title", 100000.00, 3),
       ( "role.title", 100000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("first_name", "last_name", 1, NULL),
		("first_name", "last_name", 2, 1),
        ("first_name", "last_name", 3, 2),
        ("first_name", "last_name", 4, 3);
