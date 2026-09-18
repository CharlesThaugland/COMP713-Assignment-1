//db init
const database = require("./services/DatabaseInit");
const connection = require("./services/DatabaseConnection");

//basic setup for express.js
const express = require('express');
const app = express();
const port = 8080;

//EJS setup
app.set("view engine", "ejs")
//read form and json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
const consoleRoutes = require("./routes/ConsoleRoutes");
app.use("/", consoleRoutes);

//server function
async function startServer() {
    //first run a check if db is running
    try {
        //function will throw error if cant establish connection
        await connection.testConnection();
    }
    catch(err){
        //display errpr and stop program
        console.log("SVR: FATAL cannot connect to db, terminating...");
        
        return;
    }

    //== SERVER RUNNING STARTS HERE ==
    //create variables for user input in terminal (initial dialogue) 
    const read = require("readline/promises");
    const rl = read.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    //ask for initial database config
    let answer;
    do {
        //prompt user simple yes/no question
        answer = await rl.question("SVR: Run initial database clean and startup? (y/N): ");

        if(answer === 'y'){
            console.log("SVR: running database init!");
            await database.initialize();
        }
        else if(answer === '' || answer === 'n'){
            console.log("SVR: not running database init, countinuing...")
        } else {
            console.log("SVR: Bogus input!");
        }
    } while (answer !== "y" && answer !== 'n' && answer !== "");

    //close stdin
    rl.close();

    //start server
    app.listen(port, () => {
        console.log(`SVR: server running on port ${port}`);
    });

}

startServer();


