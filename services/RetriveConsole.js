const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

//retrieve all consoles
async function retrieveAll(){
    let sql = "SELECT * FROM consoledex.consoles";

    const [results] = await con.query(sql);
    console.log("DB: consoles retrived");

    return results;
}

//retreive a specific console
async function retrieveConsole(id){
    let sql = "SELECT * FROM consoledex.consoles WHERE console_id = ?"

    const [results] = await con.query(sql, [id]);
    console.log("DB: console retrived");

    return results[0];
}

module.exports = {
    retrieveAll,
    retrieveConsole
};