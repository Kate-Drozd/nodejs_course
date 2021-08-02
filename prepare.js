'use strict'


// TODO: Prepare working directory script:
//   d   - function checkGitignore(): Check if ".gitignore" file exists, otherwise throw an error: "No '.gitignore' file. Please create .gitignore' file, otherwise all .txt files will be commited"
//   d   - function checkOutputFolder(): Check "output" folder. If 'output' folder exists, throw an error:
//                                      "Output folder is here, but need to be removed (use cleanup script)"
//                                      If there is no folder, proceed
//   d   - function createOutputFolder(): Create directory "output"

//      NOTE: file can be executed as script and can be exported, you need to handle both cases

const fs = require('fs');
const {isEqual, difference} = require('lodash');
const {requiredFiles} = require('./resources.json');
const cleanup = require('./cleanup.js');


function prepareWorkspace() {
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
    if (fs.existsSync('./Output')) {
        throw new Error("Output folder is here, but need to be removed");
        cleanup.cleanup(); 
    }
    return
}

function createOutputFolder() {
    fs.mkdir('./Output'=>{console.log('Output directory created successfully!')});
}

if(require.main === module){
    // this module was run directly from the command line as in node xxx.js
    prepareWorkspace();
} else {
    // this module was not run directly from the command line and probably loaded by something else
    module.exports = prepareWorkspace();
}