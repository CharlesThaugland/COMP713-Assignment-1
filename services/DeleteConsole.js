const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

//delete a specific console
async function deleteConsole(id){
    let sql = "DELETE FROM consoledex.consoles WHERE console_id = ?";

    await con.query(sql, [id]);
    console.log("DB: deleted console");
}

module.exports = {
    deleteConsole
};