const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

//delete a specific console
async function deleteConsole(id){

    //first use helper function to delete accessories due to foreign key contraints
    await deleteAccessories(id);

    //now delete the console
    let sql = "DELETE FROM consoledex.consoles WHERE console_id = ?";

    await con.query(sql, [id]);
    console.log("DB: deleted console");

    

}

//delete the accessories related to the console
async function deleteAccessories(id) {
    let sql = "DELETE FROM consoledex.accessories WHERE console_id = ?";

    await con.query(sql, [id]);
    console.log("DB: deleted accessories related to console");
}

module.exports = {
    deleteConsole
};