const database = require("./DatabaseConnection");
const con = database.createConnectionPool();


//store a new console
async function newConsole(consoleData, accessoriesData){
    //== STORE CONSOLE ==
    let sql = `INSERT INTO consoledex.consoles (name, console_condition, value, model_no, notes)
    VALUES (?, ?, ?, ?, ?)`;

    //query and get created console_id for accessory
    const [result] = await con.query(sql, [consoleData.name, 
        consoleData.console_condition, 
        consoleData.value, 
        consoleData.model_no, 
        consoleData.notes]);

    console.log("DB: new console added!");
    
    //get the generated console_id from the sql query
    const consoleID = result.insertId;

    //== STORE ACCESSORIES ==
    //loop through each accessory, storing the data and relating to console
    for(const acc of accessoriesData){
        let sql = `INSERT INTO consoledex.accessories (name, acc_condition, model_no, notes, console_id)
        VALUES (?, ?, ?, ?, ?)`;

        //query db
        await con.query(sql, [acc.name, 
            acc.acc_condition, 
            acc.model_no, 
            acc.notes, 
            consoleID]);
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