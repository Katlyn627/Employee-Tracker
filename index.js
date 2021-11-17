// Import and require inquirer 
const inquirer = require("inquirer");
// Import and require questions library
const questions = require('./lib/questions')
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Create PORT and input express middleware
const PORT = process.env.PORT || 3001;


// Create connection to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'password',
    database: 'library_db'
  },
  console.log(`Connected to the library_db database.`)
);


// Created start function to prompt user choices with cases and breaks for all prompts
async function startPrompts() {
    const userChoice = await inquirer.prompt(questions.initialQuestion);
    switch (userChoice.initial) {
        case "Add an employee":
            addEmployee();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addNewRole();
            break;
        case "View departments":
            printDepartments();
            break;
        case "View employees":
            printEmployees();
            break;
        case "Update employee role":
            updateRole();
            break;
        case "View all employees by manager":
            employeesByManager();
            break;
        case "Remove employee":
            removeEmployee();
            break;
        case "View all employees by department":
            employeesByDepartment();
            break;
        case "View all roles":
            printRoles();
            break;
        case "Remove roles":
            removeRole();
            break;
        case "Quit":
            connection.end();
            break;
        default:
            connection.end();
    }

}
// Create add employee function


async function addEmployee() {
    db.connect(function(err) {
        if (err) throw err;
        db.query("SELECT * FROM employees", function (err, result, fields) {
          if (err) throw err;
          console.table(result);
        });
      });   
}

// Create add department function
async function addDepartment() {

}

// Create add new role function
async function addNewRole() {

}

// Create update role function
async function updateRole() {

}

// Create print dempatment function
function printDepartments() {

}

// Create print employee function
function printEmployees() {

}

// Create print role function
function printRoles() {

}

// Create search employee by Manager function
function employeesByManager() {

}

// Create search employee by department function
function employeesByDepartment() {

}

// Create remove role function 
async function removeRole() {

}

//  Create remove employee function
function removeEmployee() {

}

module.exports = startPrompts;