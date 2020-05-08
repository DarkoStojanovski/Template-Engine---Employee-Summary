const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

var employees = [];
let genQuestions = [
    {
        type: "input",
        message: "Name:",
        name: "name"
    },
    {
        type: "input",
        message: "Email:",
        name: "email"
    },
    {
        type: "input",
        message: "Enter your employee ID:",
        name: "ID"
    }
];


inquirer
    .prompt([
        {
            type: "input",
            message: "Name:",
            name: "name"
        },
        {
            type: "input",
            message: "Email:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter your employee ID:",
            name: "ID"
        },
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber"

        },

    ])
    .then(function (answers) {
        //    switch (answers.role){
        //        case "Manager":
        // console.log(answers);
        var manager = new Manager(answers.name, answers.ID, answers.email, answers.officeNumber);
        // console.log(manager);
        employees.push(manager);
        needsEmployees();
    });
// function questions() {
//     var genQuestions = [
//         {
//             type: "input",
//             messagge: "Name:",
//             name: "name"
//         },
//         {
//             type: "input",
//             messagge: "Email:",
//             name: "email"
//         },
//         {
//             type: "input",
//             messagge: "Enter your employee ID:",
//             name: "ID"
//         }
//     ]
// }

const needsEmployees = () => {
    inquirer.prompt({
        type: "input",
        message: "would you like to add a new employee?",
        name: "newEmployee"
    })
        .then(function (answers) {
            if (answers.newEmployee === "yes") {
                inquirer.prompt({

                    type: "list",
                    name: "role",
                    messagge: "What is employee position you want to create?",
                    choices: ["Engineer", "Intern"]

                })
                    .then(function (choices) {
                        if (choices.role === "Engineer") {
                            var gitHubQuestion = {
                                type: "input",
                                name: "github",
                                message: "What is your gitHub name?"
                            }
                            var engineerQuestions = genQuestions.slice();
                            engineerQuestions.push(gitHubQuestion);
                            inquirer.prompt(engineerQuestions)


                                .then(function (answers) {
                                    var engineer = new Engineer(answers.name, answers.ID, answers.email, answers.github)
                                    employees.push(engineer);
                                    needsEmployees();


                                });
                        }
                        if (choices.role === "Intern") {
                            var internQuestion = {
                                type: "input",
                                name: "school",
                                message: "What is your school name?"
                            }
                            var internQuestions = genQuestions.slice();
                            internQuestions.push(internQuestion);
                            inquirer.prompt(internQuestions)


                                .then(function (answers) {
                                    var intern = new Intern(answers.name, answers.ID, answers.email, answers.school)
                                    employees.push(intern);
                                    needsEmployees();

                                });
                        }

                    });
            } else {
                console.log(employees);
                render(employees);
                var htmlString = render(employees);
                fs.mkdirSync(OUTPUT_DIR);
                fs.writeFileSync(outputPath, htmlString);
                return employees;
            }

        })
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
