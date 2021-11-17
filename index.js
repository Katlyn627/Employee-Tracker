// Import and require inquirer 
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
          updateEmployee();
          break;

        case "Exit":
          exit();
          break;
      }
    });
}
// Create view departments function
function viewDepartments() {
  connection.query("SELECT name, id FROM employees.department ORDER BY id asc", query, function (err, res) {
    console.table(res);
    startPrompts();
  });
}
// Create view employee function
function viewEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;", query, function (err, res) {
    console.table(res);
    startPrompts();
  });
}
// Create view role function
function viewRoles() {
  connection.query("SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id;", query, function (err, res) {
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
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        query,
        [answer.first_name, answer.last_name, answer.role_id, answer.mananager_id],
        function (err, res) {
          if (err) throw err;
          console.log(`Successfully Added Employee: ${answer.first_name} ${answer.last_name}`);
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
      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        query,
        [answer.title, answer.salary, answer.departmentID],
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
      name: "departmentName",
      type: "input",
      message: "What is the name of the department you would like to add?",
      choices: [
        "Sales",
        "Engineering",
        "Legal",
        "Finance"
      ]
    },
  ])
    .then(function (answer) {
      connection.query("INSERT INTO department (name) VALUE (?)", query, answer.departmentName, function (err, res) {
        if (err) throw err;
        console.log(`Successfully Added Department!`);
        startPrompts();
      });
    });
}
// Create function to update employee role
function updateEmployee() {
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
      connection.query("UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?", query, [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDeptID, parseInt(answer.currentEmployeeID)], function (err, res) {
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
