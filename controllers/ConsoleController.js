//database
const databaseDelete = require("../services/DeleteConsole");
const databaseRetrive = require("../services/RetriveConsole");
const databaseStore = require("../services/StoreConsole");
const inputCheck = require("../services/ConsoleInputcheck");
const IDGenerator = require("../services/ConsoleIDGenerator.js");

//display the contents of the home page
async function displayHomePage(req, res) {
    //get all the consoles 
    const consoles = await databaseRetrive.retrieveAll();

    //sent the console objects to the ejs page
    res.render("home", {
        consoles: consoles
    });
}

//display the page to add a new console
async function displayAddPage(req, res) {
    //get all the consoles from the db
    const consoles = await databaseRetrive.retrieveAll();

    res.render("add", {
        //send the number through to the ejs page
        counter: consoles.length
    });
}

async function checkAndSubmitConsole(req, res) {
    //get the body data
    const consoleData = {
        name: req.body.name,
        console_condition: req.body.console_condition,
        value: req.body.value,
        model_no: req.body.model_no,
        notes: req.body.notes
    };

    const accessoryData = req.body.accessories;

    //check the entrires of console
    let consoleCheck = await inputCheck.consolecheck(consoleData);
    
    //accessory checj
    let accessoryCheck = true; //defualt to true if no accessories

    //get each accessory, check and add the data
    for(let i in accessoryData.length){
        //check format
        accessoryCheck = await inputCheck.accessoryCheck(accessoryData[i]);

        if(!accessoryCheck){
            //back accessory so exit loop and stop checking
            break;
        }
    }

    //store the console and accessories, both need to be correct to store
    //if not correct, tell user and reset form
    if(consoleCheck && accessoryCheck){
        //generate a id for console
        consoleData.console_id = await IDGenerator.ConsoleIDGenerator();

        //store data
        await databaseStore.newConsole(consoleData, accessoryData);
    }
    else{
        //redirect page
    }
}

module.exports = {
    displayHomePage,
    displayAddPage,
    checkAndSubmitConsole
};