//database
const databaseDelete = require("../services/DeleteConsole");
const databaseRetrive = require("../services/RetriveConsole");
const databaseStore = require("../services/StoreConsole");
const inputCheck = require("../services/ConsoleInputcheck");

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
    const query = req.query.badinput; //retrive the query string
    let badInput = "false"; // use string as query will be string
    
    ///check if redirect
    if(query !== undefined){
        badInput = query;
    }

    res.render("add", {
        //send the number through to the ejs page
        counter: consoles.length,
        input: badInput
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

    const accessoryData = req.body.accessories || []; //if undefined set as empty arr

    //check the entrires of console
    let consoleCheck = await inputCheck.consolecheck(consoleData);
    
    //accessory checj
    let accessoryCheck = true; //defualt to true if no accessories

    //get each accessory, check and add the data
    for(const acc of accessoryData){
        //check format
        accessoryCheck = await inputCheck.accessoryCheck(acc);

        if(!accessoryCheck){
            //back accessory so exit loop and stop checking
            break;
        }
    }

    //store the console and accessories, both need to be correct to store
    //if not correct, tell user and reset form
    if(consoleCheck && accessoryCheck){
        //store data
        await databaseStore.newConsole(consoleData, accessoryData);

        //redirct to home
        res.redirect("/home");
    }
    else{
        //redirect page, pass the query in to tell route that user input is incorrect
        res.redirect("/home/add?badinput=true");
    }
}

module.exports = {
    displayHomePage,
    displayAddPage,
    checkAndSubmitConsole
};