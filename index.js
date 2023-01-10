//import required modules
const inquirer = require(`inquirer`)
const fs = require(`fs`)
const Engineer = require(`./lib/Engineer`)
const Intern = require(`./lib/Intern`)
const Manager = require(`./lib/Manager`)
//empty array to be populated based on user input with class info
let employeeRoster = []

const managerCard = employee => {
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${employee.getName()}</h5>
      <h5 class="card-title">${employee.getRole()}</h5>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">${employee.getId()}</li>
      <li class="list-group-item"><a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
      <li class="list-group-item">${employee.getOfficeNumber()}</li>
    </ul>
    </div></div>`
}
const engineerCard = employee => {
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${employee.getName()}</h5>
      <h5 class="card-title">${employee.getRole()}</h5>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">${employee.getId()}</li>
      <li class="list-group-item"><a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
      <li class="list-group-item"><a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a></li>
    </ul>
    </div></div>`
}
const internCard = employee => {
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${employee.getName()}</h5>
      <h5 class="card-title">${employee.getRole()}</h5>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">${employee.getId()}</li>
      <li class="list-group-item"><a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
      <li class="list-group-item">${employee.getSchool()}</li>
    </ul>
    </div></div>`
}

const renderCards = employeeRoster => {
    let cardArray = []
    employeeRoster.forEach(employee => {
        const role = employee.getRole()
        if(role === `Manager`){
           const managerInfo = managerCard(employee)
           cardArray.push(managerInfo)
        }
        if(role === `Engineer`){
           const engineerInfo = engineerCard(employee)
           cardArray.push(engineerInfo)
        }
        if(role === `Intern`){
          const internInfo = internCard(employee)
          cardArray.push(internInfo)
        }})
    const cards = cardArray.join(``)   
    const displayCards = renderHMTL(cards)
    return displayCards
}

const renderHMTL = cards => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <title>Employee Cards</title>
    </head>
    <body>
        <nav class="navbar mx-auto bg-primary">
            <div class="container">
              <h1>My Team</h1>
            </div>
          </nav>
        <div>${cards}</div>  
    </body>
    </html>`
}

function init() {
    inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `please enter team manager's name: `
        },
        {
            type: `input`,
            name: `id`,
            message: `please enter team manager's id: `
        },
        {
            type: `input`,
            name: `e-mail`,
            message: `please enter team manager's email: `
        },
        {
            type: `input`,
            name: `officeNumber`,
            message: `team manager's office number: `
        }
    ]).then((data) => {
        let currName = data.name
        let currEmail = data.email
        let currId = data.id
        let currOfficeNum = data.officeNumber
        const currManager = new Manager(currName, currId, currEmail, currOfficeNum)
        employeeRoster.push(currManager)
        employeePrompt()
    })
}
function employeePrompt(){
    inquirer.prompt([
        {
            type: `list`,
            name: `role`,
            message: `employee's role`,
            choices: ['Engineer', `Intern`, `Finished Building Team`]
        },
        {
            type: `input`,
            name: `name`,
            message: `employee's name`
        },
        {
            type: `input`,
            name: `id`,
            message: `employee's id`
        },
        {
            type: `input`,
            name: `email`,
            message: `employee's email`
        }
    ]).then((data)=>{
        let currName = data.name
        let currEmail = data.email
        let currId = data.id
        if(data.role === `Engineer`) {
            inquirer
                .prompt([
                    {
                        type: `input`,
                        name: `github`,
                        message: `engineer's github`
                    },
                    {
                        type: `confirm`,
                        name: `addMore`,
                        message: `Add more employees?`,
                        default: false
                    }
                ]).then((data) => {
                    let currGithub = data.github
                    let moreEmploy = data.addMore
                    let currEngineer = new Engineer(currName, currId, currEmail, currGithub)
                    employeeRoster.push(currEngineer)
                    if (moreEmploy) {
                        return employeePrompt()
                    } else {
                        fs.writeFile('index.html', generateHTML(teamMembers), (err) =>
                            err ? console.log(err) : console.log(`You've successfully created index.html!`)
                        )
                    }
                })
        }
        if(data.role === `Intern`) {
            inquirer
                .prompt([
                    {
                        type: `input`,
                        name: `school`,
                        message: `engineer's github`
                    },
                    {
                        type: `confirm`,
                        name: `addMore`,
                        message: `Add more employees?`,
                        default: false
                    }
                ]).then((data) => {
                    let currSchool = data.school
                    let moreEmploy = data.addMore
                    let currEngineer = new Engineer(currName, currId, currEmail, currSchool)
                    employeeRoster.push(currIntern)
                    if (moreEmploy) {
                        return employeePrompt()
                    } else {
                        fs.writeFile('index.html', generateHTML(teamMembers), (err) =>
                            err ? console.log(err) : console.log(`You've successfully created index.html!`)
                        )
                    }
                })
        }
        if(data.role === `Finished Building Team`){
            fs.writeFile('index.html', generateHTML(teamMembers), (err) =>
            err ? console.log(err) : console.log(`You've successfully created index.html!`)
        )

        }
        
    })
}
 init()



