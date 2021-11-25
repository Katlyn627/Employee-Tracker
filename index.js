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

let employees = [];
// let employeeResults = ("SELECT first_name + ' ' + last_name AS full_name");
// let restueEmployee = ("SELECT")
let query = ("SELECT id, first_name, last_name FROM employee")

connection.query(query, (err, results) => {
  // console.log(results);
  for (let i = 0; i < results.length; i++) {
    var fullName = results[i].first_name + " " + results[i].last_name;
    results[i].fullName = fullName;

    // console.log(results[i]);
    employees.push(results[i])
  }
  // console.log(employees);
})
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
  console.log(employees);
  let nameChoices = [];
for (i=0;i<employees.length; i++)
{
  nameChoices.push(employees[i].first_name + " " + employees[i].last_name);
}
  console.log("Updating an employee");
  inquirer.prompt([
    // {
    //   name: "currentEmployeeID",
    //   type: "input",
    //   message: "Which employee's role would you like to update?",
    // },
    {
      name: "employee",
      type: "list",
      choices: nameChoices,
    },
    {
      name: "newRoleSalary",
      type: "input",
      message: "What is their new salary?",
    },
    {
      name: "newRoleID",
      type: "list",
      message: "What role will they belong to?",
      choices: [1, 2, 3, 4]
    },
  ])
    .then(function (answer) {
      console.log(answer);
      console.log(+answer.newRoleSalary);
      connection.query(`UPDATE employee SET role_id =  ${Number(answer.newRoleID)} WHERE id = ${answer.currentEmployeeID}`, function (err, result) {
        if (err) throw err;
        viewEmployees();
        console.log("Employee Role updated successfully")
        startPrompts();
      });
    });

// Create exit function
function exit() {
  process.exit();
}
}

startPrompts();