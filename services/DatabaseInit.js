//create a database pool connection
const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

//function to create the entire db and insert correct tables
async function initialize(){
    //1. wipe all consoledexdb, create db, create tables
    await wipeDB();
    await createDB();
    await createTables();
}
//== HELPER FUNCTIONS ==

//function to delete entire database
async function wipeDB(){
    //delete the consoledex database
    let sql = "DROP DATABASE IF EXISTS consoledex";
    
    //exec the query
    await con.query(sql);
    console.log("DB: entire database has been deleted!");
}

async function createDB(){
    //create consoledex db, this db will not previously exist, so no checks required
    let sql = "CREATE DATABASE consoledex"

    //exec the query
    await con.query(sql);
    console.log("DB: entire database has been created!");

}

//create the tables
async function createTables(){
    //create the console table
    const sqlConsole = `
    CREATE TABLE consoledex.consoles(
        console_id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        console_condition VARCHAR(50),
        value DECIMAL(10,2),
        model_no VARCHAR(50),
        notes VARCHAR(1000)
    )    
    `
    const sqlAccess = `
    CREATE TABLE consoledex.accessories(
        acc_id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        acc_condition VARCHAR(50),
        model_no VARCHAR(50),
        notes VARCHAR(500),
        console_id INT,

        FOREIGN KEY (console_id)
            REFERENCES consoledex.consoles(console_id)
    )
    `
    //execure the statements in order
    await con.query(sqlConsole)
    console.log("DB: consoles tabel created!");

    await con.query(sqlAccess)
    console.log("DB: accessories tabel created!");
}

module.exports = {
    initialize
};