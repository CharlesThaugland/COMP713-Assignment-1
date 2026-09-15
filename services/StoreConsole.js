const database = require("./DatabaseConnection");
const con = database.createConnectionPool();


//store a new console
function newConsole(consoleData, accessoriesData){
    //store the console
    let sql = `INSERT INTO consoles (console_id, name, condition, value, model_no, region, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    con.query(sql, [consoleData.console_id, 
                    consoleData.name, 
                    consoleData.condition, 
                    consoleData.value, 
                    consoleData.model_no, 
                    consoleData.region, 
                    consoleData.notes], function(err, results) {

        if (err) throw err;
        console.log("DB: new console added!");
    });

    //then store the accessories for the console
    for(acc in accessoriesData){
        let sql = `INSERT INTO consoles (acc_id, name, condition, model_no, notes, console_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    }
}

//modify console
function editConsole(consoleData){

}