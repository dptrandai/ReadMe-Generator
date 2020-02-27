// vars for all packages used 
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inquirer.prompt([
    // Questions that will be promted to gather info on project
    {
        message: "What is your GitHub username?",
        name: "username",
    },
    {
        message: "What is the title of your project?",
        name: "title",
    },
    {
        message: "Write a descirption of the project.",
        name: "description",
    },
    {
        message: "What kind of license would you need?",
        name: "license",
    },
    {
        message: "What command line should be ran to install dependecies?",
        name: "install",
    },
    {
        message: "What command line should be ran to run tests?",
        name: "tests",
    },
    {
        message: "What does the user need to know about using the repo?",
        name: "usage",
    },
    {
        message: "What does the user need to know about contributing to the repo?",
        name: "contribute",
    },
    {
        message: "questions?",
        name: "press enter for README",
    },
]).then(function(response){
    //vars for the response from the user
    const username = response.username
    const title = response.title
    const description = response.description
    const license = response.license
    const install = response.install
    const tests = response.tests
    const usage = response.usage
    const contribute = response.contribute
    const queryUrl =  `https://api.github.com/users/${username}?client_id=${
        process.env.CLIENT_ID
        }&client_secret=${process.env.CLIENT_SECRET}`
    const question = response.questions

    //this will get the user's GitHub Account
    axios
    .get(queryUrl)
    .then(function(res){
        console.log(res)
    //vars to grab the information we need from the GitHub account
    const location = res.data.location
        console.log("Location: " + location);
    const email = res.data.email
        console.log("Email: " + email);
    const avatar = res.data.avatar_url
        console.log("avatar: " + avatar);

    //page makes all the data and strings needed for writeFile to make a markdown read me
    const page = "#" + title  + "\n## Description\n" + description + "\n## Table of contents\n" +
    "* Installation: " + install + "\n* Usage: " + using + "\n* License: " + license + "\n* Contributing: " + contribute
    + "\n* Test: " + test + "\n* Questions: " + questions + "\n## Installation \n" + "To install necessary dependances, run the following command: \n" + "```\t" + install +  "```"
    + "\n## Usage \n" + using + "\n## Licencse \n" + `The project is licesned under the ${license} license` 
    + "\n## Contributing \n" + contribute 
    + "\n## Tests \n" +  "To run test run the following command: \n" + "```\t" + test +  "```"
    +"\n## Questions \n"
    
    fs.writeFile("./readme2.md", page, function(err){
        if(err){
            throw err
        }console.log("done son")
    })
    })
})