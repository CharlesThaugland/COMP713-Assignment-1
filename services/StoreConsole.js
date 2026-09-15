const database = require("./DatabaseConnection");
const con = database.createConnectionPool();


//store a new console
async function newConsole(consoleData, accessoriesData){
    //== STORE CONSOLE ==
    let sql = `INSERT INTO consoledex.consoles (console_id, name, console_condition, value, model_no, notes)
    VALUES (?, ?, ?, ?, ?, ?)`;

    //query and get results
    await con.query(sql, [consoleData.console_id, 
        consoleData.name, 
        consoleData.console_condition, 
        consoleData.value, 
        consoleData.model_no, 
        consoleData.notes]);

    console.log("DB: new console added!");

    //== STORE ACCESSORIES ==
    //loop through each accessory, storing the data and relating to console
    for(let acc in accessoriesData){
        let sql = `INSERT INTO consoledex.accessories (acc_id, name, acc_condition, model_no, notes, console_id)
        VALUES (?, ?, ?, ?, ?, ?)`;

        //query db
        await con.query(sql, [accessoriesData[acc].acc_id, 
            accessoriesData[acc].name, 
            accessoriesData[acc].acc_condition, 
            accessoriesData[acc].model_no, 
            accessoriesData[acc].notes, 
            consoleData.console_id]);
        console.log("DB: accessories for console added!");
    }
}

//modify console
function editConsole(consoleData){
    //todo
}

module.exports = {
    newConsole,
    editConsole
};