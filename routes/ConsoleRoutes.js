//express
const express = require('express');
const router = express.Router();

//controllers
const consoleController = require("../controllers/ConsoleController");


//== HOME PAGE ==
//display home page
router.get("/home", consoleController.displayHomePage);
//reroute to home
router.get("/", consoleController.homeRoute);



//== ADD CONSOLE PAGE ==
router.get("/home/add", consoleController.displayAddPage);
router.post("/home/add", consoleController.checkAndSubmitConsole);

//== EDIT CONSOLE PAGE ==



module.exports = router;