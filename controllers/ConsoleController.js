//database
const databaseDelete = require("../services/DeleteConsole");
const databaseRetrive = require("../services/RetriveConsole");
const databaseStore = require("../services/StoreConsole");

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

    //add to db
    await databaseStore.newConsole(consoleData);

    
}

module.exports = {
    displayHomePage,
    displayAddPage
};