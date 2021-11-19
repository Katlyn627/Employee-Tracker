USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ( "Salesperson", 100000.00, 1),
       ( "Accountant", 100000.00, 2),
       ( "Software Engineer", 100000.00, 3),
       ( "Mechanical Engineer", 100000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("James", "Michales", 1, NULL),
		("Aaron", "Samuels", 2, 1),
        ("David", "Smith", 3, 2),
        ("Marc", "Jacobs", 4, 3);

