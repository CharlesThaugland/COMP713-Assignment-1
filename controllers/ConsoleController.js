//database
const databaseDelete = require("../services/DeleteConsole");
const databaseRetrive = require("../services/RetriveConsole");
const databaseStore = require("../services/StoreConsole");
const inputCheck = require("../services/ConsoleInputcheck");


// == HOME PAGE ==
//reroute / to home/
async function homeRoute(req, res){
    //redict
    res.redirect("/home");
}

//display the contents of the home page
async function displayHomePage(req, res) {
    //get all the consoles 
    const consoles = await databaseRetrive.retrieveAll();

    //sent the console objects to the ejs page
    res.render("home", {
        consoles: consoles
    });
}



//== ADD CONSOLE PAGE ==
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



//== VIEW FULL CONSOLE DETAILS PAGE ==
//display view consle page
async function displayViewConsolePage(req, res){
    //display the page using the id
    const console_id = req.query.console_id;

    //retrive the console and its accessories
    const consoleData = await databaseRetrive.retrieveConsole(console_id);
    const accessoriesData = await databaseRetrive.retrieveAccessories(console_id);

    //render the page sending the objects to ejs
    res.render("viewconsole",{ 
        consoles: consoleData,
        accessories: accessoriesData
    });
}

//delete console from the db
async function deleteConsole(req, res) {
    const console_id = req.body.console_id;

    //delete the console from the db then redirect to home page
    if(console_id !== undefined){
        //delte console
        await databaseDelete.deleteConsole(console_id);
        console.log("RTE: deleted console!");
    }
    else{
        console.log(`RTE: cannot delete console!, console is ${console_id}`);
    }

    //redirect
    res.redirect("/home");
}

module.exports = {
    displayHomePage,
    displayAddPage,
    checkAndSubmitConsole,
    homeRoute,
    deleteConsole,
    displayViewConsolePage
};