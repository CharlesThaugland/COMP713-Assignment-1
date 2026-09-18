const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

//delete a specific console
async function deleteConsole(id){
    try {
        //first use helper function to delete accessories due to foreign key contraints
        await deleteAccessories(id);

        //now delete the console
        let sql = "DELETE FROM consoledex.consoles WHERE console_id = ?";

        await con.query(sql, [id]);
        console.log("DB: deleted console");
    }
    catch(err){
        //show error in console
        console.error(`DB: could not delete console with ID: ${id}!`, err.message);

        //send error back
        throw err;
    }
}

//delete the accessories related to the console
async function deleteAccessories(id) {
    try {
        //delete the accessories related to the id
        let sql = "DELETE FROM consoledex.accessories WHERE console_id = ?";

        await con.query(sql, [id]);
        console.log("DB: deleted accessories related to console");
    }
    catch(err){
        //show error in console
        console.error(`DB: could not accessories with console with ID: ${id}!`, err.message);

        //send error back
        throw err;
    }
}

module.exports = {
    deleteConsole
};