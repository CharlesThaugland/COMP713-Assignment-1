const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

//delete a specific console
function retrieveAll(id){
    let sql = "DELETE FROM Consoles WHERE console_id = ?";

    con.query(sql, id, function(err, results) {
        if (err) throw err;
        console.log("DB: consoles retrived");
        
        return results;
    });
}