USE employees_db;

INSERT INTO department (name)
VALUES ("Lion King"),
       ("The Godfather"),
       ("West Side Story"),
       ("Parasite"),
       ("The Wizard of Oz");

INSERT INTO role (title, salary, department_id)
VALUES ( "Zazu", 65000, 1),
       ( "Zazu", 65000, 1),
       ( "Zazu", 65000, 1),
       ( "Zazu!", 65000, 1),
       ( "Zazu", 65000, 1),
       ( "Zazu", 65000, 1),
       ( "Zazu", 65000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("Kyle", "Mars", 1, NULL),
		("Kyle", "Mars", 2, NULL),
        ("Kyle", "Mars", 3, 2),
        ("Kyle", "Mars", 4, 2);
