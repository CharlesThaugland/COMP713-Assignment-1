const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

async function ConsoleIDGenerator(){
    //retrive the highest console id from consoles table
    let sql = "SELECT MAX(console_id) AS highest_id FROM consoledex.consoles";

    const [results] = await con.query(sql);
    console.log("DB: retrived all console IDs!");

    //if there are no entries, it will be null, check to see then get highest entry
    let tempConsoleID = 1;
    if(results[0].highest_id !== null){
        //increment tempconsole ID to next highest num
        tempConsoleID = results[0].highest_id + 1;
        

    }

    //return the new generated ID
    return tempConsoleID;
}

module.exports = {
    ConsoleIDGenerator
};