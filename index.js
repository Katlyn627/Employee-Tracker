// Import and require inquirer 
const { query } = require("express");
const inquirer = require("inquirer");

//Import mysql
const mysql = require('mysql');

// Create connection to mysql


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
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
  let query = "SELECT name, id FROM employees.department ORDER BY id asc";
  connection.query(query, function (err, res) {
    console.table(res);
    startPrompts();
  });
}

function viewEmployees() {
  let query =
    "SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;";
  connection.query(query, function (err, res) {
    console.table(res);
    startPrompts();
  });
}
// Create view role function
function viewRoles() {
  let query = "SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id;";
  connection.query(query, function (err, res) {
    console.table(res);
    startPrompts();
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
      name: "mananger_id",
      type: "input",
      message: "What is your manager ID?",
    },
  ])
    .then(function (answer) {
      let query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(
        query,
        [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
        function (err, res) {
          if (err) throw err;
          console.log(`Successfully Added Employee: ${answer.firstName} ${answer.lastName}`);
          startPrompts();
        }
      );
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
      type: "input",
      message:
        "What is the Department ID for this new role? Please select 1 for Sales, 2 for Engineering, 3 for Finance, 4 for Legal.",
      choices: [1, 2, 3, 4],
    },
  ])
    .then(function (answer) {
      let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(query, [answer.title, answer.salary, answer.departmentID],
        function (err, res) {
          if (err) throw err;
          console.log(`Successfully Added Role: ${answer.title}`);
          startPrompts();
        }
      )
    }
    )
}
// Create function to add department
function addDepartment() {
  inquirer.prompt([
    {
      name: "department_name",
      type: "list",
      message: "What is the name of the department you would like to add?",
    },
  ])
    .then(function (answer) {
      let query = "INSERT INTO department (name) VALUE (?)";
      connection.query(query, answer.department_name, function (err, res) {
        if (err) throw err;
        console.log(`Successfully Added Department!`);
        startPrompts();
      });
    });
}
// Create function to update employee role
function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: "currentEmployeeID",
      type: "input",
      message: "What is the ID of the employee you would like update?",
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
      let query = "UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?";
      connection.query(query, [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDeptID, parseInt(answer.currentEmployeeID)], function (err, res) {
        if (err) throw (err);
        console.log("Successful Update!");
        startPrompts();
      })
    }
    )
}
// Create exit function
function exit() {
  process.exit();
}

startPrompts();