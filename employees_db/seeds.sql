USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Service"),
       ("Production"),
       ("Research and Development"),
       ("Human Resources"),
       ("Marketing"),
       ("Purchasing and Realty");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 100000.00, 1),
       ("Accountant", 100000.00, 3),
       ("Software Engineer", 100000.00, 2),
       ("Mechanical Engineer", 100000.00, 2),
       ("Realtor", 200000.00, 10),
       ("HR Manager", 50000.00, 8),
       ("Service Technichian", 40000.00, 5),
       ("Lawyer", 100000.00, 4),
       ("Marketing Manager", 80000.00, 9),
       ("Production Manager", 70000.00, 6),
       ("Researcher", 40000.00, 7);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("James", "Michales", 1, NULL),
		("Aaron", "Samuels", 2, 1),
        ("David", "Smith", 3, 2),
        ("Marc", "Jacobs", 4, 3),
        ("Kasey", "Case", 5, 2),
        ("Jeff", "Bezos", 6, NULL),
        ("Robin", "Williams", 7, 4),
        ("Eric", "Case", 8, NULL );

