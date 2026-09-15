const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

//retrieve all consoles
function retrieveAll(){
    let sql = "SELECT * FROM consoles";

    con.query(sql, function(err, results) {
        if (err) throw err;
        console.log("DB: consoles retrived");
        
        return results;
    });
}

//retreive a specific console
function retrieveConsole(id){
    let sql = "SELECT * FROM consoles WHERE console_id = ?"

    con.query(sql, id, function(err, results) {
        if (err) throw err;
        console.log("DB: console retrived");
        
        return results;
    })
}