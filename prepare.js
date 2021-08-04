'use strict'

const fs = require('fs');
const {isEqual, difference} = require('lodash');
const {requiredFiles} = require('./resources.json');

module.exports = function prepareWorkspace() {
    checkGitignore();
    checkDataFolder();
    checkOutputFolder();
    createOutputFolder();
}

function checkGitignore() {
    if (!fs.existsSync('.gitignore')) {
        throw new Error("No '.gitignore' file. Please create .gitignore' file, otherwise all .txt files will be commited");
    }
}

function checkDataFolder() {
    if (!fs.existsSync('./data')) {
        throw new Error("No 'data' file");
    }
    console.log(' -> ./data folder exists');

    const existFiles = fs.readdirSync('./data');
    if (!isEqual(existFiles, requiredFiles)) {
        throw new Error(`Not enough files in './data' folder: missed '${difference(requiredFiles, existFiles)}' file(s)`);
    }
    console.log(' -> files in ./data folder exist');
}

function checkOutputFolder() {
    if (fs.existsSync('./output')) {
        throw new Error("Output folder is here, but need to be removed");
    }
    return
}

function createOutputFolder() {
    fs.mkdir('./output', { recursive: true }, (err) => {
  if (err) throw err;
});
    console.log('Output directory created successfully!');
}

if(require.main === module){
    prepareWorkspace();
} 