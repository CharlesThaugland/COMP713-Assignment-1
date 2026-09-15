//express
const express = require('express');
const router = express.Router();

//controllers
const consoleController = require("../controllers/ConsoleController");


//== HOME PAGE ==
//display home page
router.get("/home", consoleController.displayHomePage);



//== ADD CONSOLE PAGE ==
router.get("/home/add", consoleController.displayAddPage);
router.post("/home/add". consoleController.)

//== EDIT CONSOLE PAGE ==


module.exports = router;