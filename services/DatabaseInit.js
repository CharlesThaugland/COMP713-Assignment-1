//create a database pool connection
const database = require("./DatabaseConnection");
const con = database.createConnectionPool();

//function to create the entire db and insert correct tables
function initialize(){
    //use callbac to exec the functions in this order:
    //1. wipe all consoledexdb, create db, create tables
    wipeDB(function () { 
        createDB(function () {
            createTables();
        });
    });
}
//== HELPER FUNCTIONS ==

//function to delete entire database
function wipeDB(callback){
    //delete the consoledex database
    let sql = "DROP DATABASE IF EXISTS consoledex";
    
    //exec the query
    con.query(sql, function (err,result) {
        if (err) throw err;
        console.log("DB: entire database has been deleted!");

        callback();
    })
}

function createDB(callback){
    //create consoledex db, this db will not previously exist, so no checks required
    let sql = "CREATE DATABASE consoledex"

    //exec the query
    con.query(sql, function (err,result) {
        if (err) throw err;
        console.log("DB: entire database has been created!");

        callback();
    })
}

//create the tables
function createTables(){
    //create the console table
    const sqlConsole = `
    CREATE TABLE consoledex.consoles(
        console_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        condition VARCHAR(100),
        value DECIMAL(10,2),
        model_no VARCHAR(50),
        region VARCHAR(50),
        notes VARCHAR(1000)
    )    
    `
    const sqlAccess = `
    CREATE TABLE consoledex.accessories(
        acc_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        condition VARCHAR(50),
        model_no VARCHAR(50),
        notes VARCHAR(500),
        console_id INT,

        FOREIGN KEY (console_id)
            REFERENCES console(console_id)
    )
    `
    //execure the statements in order
    con.query(sqlConsole, function (err,result) {
        if (err) throw err;
        console.log("DB: consoles tabel created!");

        //call accessories next
        con.query(sqlAccess, function (err,result) {
            if (err) throw err;
            console.log("DB: accessories tabel created!");
        })
    })
}