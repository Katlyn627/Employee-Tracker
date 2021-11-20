// Import and require inquirer 
const inquirer = require("inquirer");

//Import mysql
const mysql = require('mysql2');

// Create connection to mysql

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "KiB7557",
  database: "employees_db"
});


function startPrompts() {
  inquirer.prompt(
    {
      name: "input",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Quit",
      ],
    })
    .then(function (answer) {
      switch (answer.input) {
        case "View All Departments":
          viewDepartments();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          exit();
          break;
      }
    });
}

function viewDepartments() {
  connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT * FROM department", function (err, result) {
      if (err) throw err;
      console.table(result);
      startPrompts();
    });
  });
}

function viewEmployees() {
  connection.connect(function (err) {
    if (err) throw err;
    const query = `SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
      role.title, 
      department.name AS department, 
      role.salary,
      
      CONCAT(manager.first_name, " ", manager.last_name) AS manager 
      FROM employee 
  LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON manager.id = employee.manager_id `
    connection.query(query, function (err, result) {
      if (err) throw err;
      console.table(result);
      startPrompts();
    });
  });
}
// Create view role function
function viewRoles() {
  connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT * FROM role", function (err, result) {
      if (err) throw err;
      console.table(result);
      startPrompts();
    });
  });
}
// Create add employee function
function addEmployee() {
  inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the employee's role ID?",
    },
    {
      name: "manager_id",
      type: "input",
      message: "What is your manager ID?",
    },
  ])
    .then(function (answer) {
      connection.connect(function (err) {
        if (err) throw err;
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${answer.first_name}", "${answer.last_name}", ${answer.role_id}, ${answer.manager_id})`, function (err, result) {
          if (err) throw err;
          viewEmployees();
        });
      });
    });
}
// Create add role function
function addRole() {
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title of the new role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary?",
    },
    {
      name: "departmentID",
      type: "list",
      message:
        "What is the Department ID for this new role? Please select 1 for Sales, 2 for Engineering, 3 for Finance, 4 for Legal, 5 for Service, 6 for Production, 7 for Research and Development, 8 for Human Resources, 9 for Marketing, and 10 for Purchasing",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  ])
    .then(function (answer) {
      console.log(answer);
      connection.connect(function (err) {
        if (err) throw err;
        connection.query(`INSERT INTO role (id, title, salary, department_id)
        VALUES (DEFAULT, '${answer.title}', ${answer.salary}, ${answer.departmentID})`, function (err, result) {
          if (err) throw err;
          console.log("Successfully added new role to database!")
          viewRoles();
        });
      });
    });
}
// Create function to add department
function addDepartment() {
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What is the name of the department you would like to add?",
    },
  ])
  .then(function (answer) {
    connection.connect(function (err) {
      if (err) throw err;
      connection.query("INSERT INTO department SET name = ?", answer.name, function (err, result) {
        if (err) throw err;
        console.log("Department successfully added to database!")
        viewDepartments();
      });
    });
  });
}
// Create function to update employee role
function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: "currentEmployeeID",
      type: "input",
      message: "Which employee's role would you like to update?",
    },
    {
      name: "newRoleTitle",
      type: "input",
      message: "What is the title of their new role?",
    },
    {
      name: "newRoleSalary",
      type: "input",
      message: "What is their new salary?",
    },
    {
      name: "newRoleDeptID",
      type: "list",
      message: "What department will they belong to? Select 1 for Sales, 2 for Engineering, 3 for Finance, 4 for Legal.",
      choices: [1, 2, 3, 4]
    },
  ])
  .then(function (answer) {
    connection.connect(function (err) {
      if (err) throw err;
      connection.query(`UPDATE employee.role SET role.title = ${answer.newRoleDeptID}, WHERE newRole = ${answer.newRoleTitle};`, function (err, result) {
        if (err) throw err;
        console.table(result);
        startPrompts();
      });
    });
  });
}
// Create exit function
function exit() {
  process.exit();
}

startPrompts();