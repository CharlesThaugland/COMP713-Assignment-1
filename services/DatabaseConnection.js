//create a connection with the local docker container database
const mysql = require("mysql2/promise");
let poolConnection = null;

//create a pool of connections so that multiple connections can be established
function createConnectionPool(){
    //check if current pool exists
    if (poolConnection) {
        return poolConnection;
    }

    //if not this will executre to create a pool
    poolConnection = mysql.createPool({
    host: "127.0.0.1", //local computer
    port: "3306",
    user: "root",
    password: "12345678"
    });

    return poolConnection;
}

async function testConnection(){
    try{
        //first check if pool exists, if not create one using function
        createConnectionPool()

        //attempt to connect to the db
        const connection = await poolConnection.getConnection();

        //give status then release conenction from pool
        console.log("DB: connection test sucessfull");
        connection.release();

        return true;

    } catch (err) {
        //log error to console
        console.error("DB: connection failed");

        //send error back
        throw err;
    }
}

//close all pool connections
async function closeConnection() {
    //first check if there is a connection
    if(!poolConnection){
        console.log("no current pool connections");
        return;
    } 
    //if a connection exists then close it
    else {
       try {
        //close the connection
        await poolConnection.end()
        poolConnection = null;

        console.log("pool closed");
       }
       catch(err){
        console.log(err);
       }
    }
} 
    
    
module.exports = {
    createConnectionPool,
    closeConnection,
    testConnection
};