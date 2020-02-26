const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inquirer.prompt([
    {
        message: "",
        name: "",
    },
    {

    },
]).then(function(response){
    //vars for the prompt response
    const username = response.username

    axios
    
})