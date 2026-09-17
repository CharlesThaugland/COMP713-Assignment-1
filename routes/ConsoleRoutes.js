//TODO
// - need to add so that user cannot go to other routes and cause error
//express
const express = require('express');
const router = express.Router();

//controllers
const consoleController = require("../controllers/ConsoleController");


//== HOME PAGE ==
router.get("/home", consoleController.displayHomePage); //display home page
router.get("/", consoleController.homeRoute); //reroute to home

//== ADD CONSOLE PAGE ==
router.get("/home/add", consoleController.displayAddPage); //display add console page
router.post("/home/add", consoleController.checkAndSubmitConsole); //submit console to db

//== CONSOLE AND ACCESSORIES PAGE ==
router.get("/home/viewconsole", consoleController.displayViewConsolePage); //display the console full details page

//== DELETE CONSOLE ==
router.post("/home/delete", consoleController.deleteConsole); //remove console from db

module.exports = router;