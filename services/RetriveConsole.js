const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

//retrieve all consoles
async function retrieveAll(){
    try {
        //get all consoles from the db
        let sql = "SELECT * FROM consoledex.consoles";

        const [results] = await con.query(sql);
        console.log("DB: consoles retrived");

        return results;
    }
    catch(err){
        //show error in console
        console.error("DB: could not retrive all consoles!", err.message);

        //send error back
        throw err;
    }
}

//retreive a specific console
async function retrieveConsole(id){
    try {
        //get the specific console
        let sql = "SELECT * FROM consoledex.consoles WHERE console_id = ?"

        const [results] = await con.query(sql, [id]);
        console.log("DB: console retrived");

        return results[0];
    }
    catch(err){
        //show error in console
        console.error(`DB: could not retrive console with ID:${id}`, err.message);

        //send error back
        throw err;
    }
}

//retrive the accessories
async function retrieveAccessories(id){
    try {
        //get the accessories
        let sql = "SELECT * FROM consoledex.accessories WHERE console_id = ?"

        const [results] = await con.query(sql, [id]);
        console.log("DB: console retrived");

        return results;
    }
    catch(err){
        //show error in console
        console.error(`DB: could not retrive accessories for console with ID:${id}`, err.message);

        //send error back
        throw err;
    }
}

module.exports = {
    retrieveAll,
    retrieveConsole,
    retrieveAccessories
};
