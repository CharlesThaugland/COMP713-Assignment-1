//create a connection with the local docker container database
const mysql = require("mysql2/promise");
let poolConnection = null;

//create a pool of connections so that multiple connections can be established
function createConnectionPool(){
    poolConnection = mysql.createPool({
    host: "127.0.0.1", //local computer
    port: "3306",
    user: "root",
    password: "12345678"
    });

    return poolConnection;
}

//close all pool connections
function closeConnection() {
    //first check if there is a connection
    if(!poolConnection){
        console.log("no current pool connections");
        return;
    } 
    //if a connection exists then close it
    else {
       poolConnection.end((err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Pool Closed");
        });
    }
} 
    
    
    
    
module.exports = {
    createConnectionPool,
    closeConnection
};