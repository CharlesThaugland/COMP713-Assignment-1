//check to see if the console input was valid
function consolecheck(consoleData){
    //check each value in each text field to see if exceeds limit or for name, is not null
    if(consoleData.name.length > 100 || consoleData.name.trim().length === 0){
        console.log("OTHR: user input is incorrect!");
        return false;
    }
    if(consoleData.console_condition.length > 50){
        console.log("OTHR: user input is incorrect!");
        return false;
    }
    if(consoleData.model_no.length > 50){
        console.log("OTHR: user input is incorrect!");
        return false;
    }
    if(consoleData.notes.length > 1000){
        console.log("OTHR: user input is incorrect!");
        return false;
    }

    //attempt to convert value to decimal
    const value = Number(consoleData.value)
    
    //check to se if it was a valid decimal and fits within range
    if(!Number.isFinite(value)){
        console.log("OTHR: user input is incorrect!");
        return false;
    }
    else if(value < 0 || value > 9999999.99){
        console.log("OTHR: user input is incorrect!");
        return false;
    }

    //if reached here, everything valid
    console.log("OTHR: user input is correct!");
    return true;
}

//check to see if accessory input was valid
function accessoryCheck(accData){
    //check each value in each text field to see if exceeds limit, or name is not null
    if(accData.name.length > 100 || accData.name.trim().length === 0){
        console.log("OTHR: user input is incorrect!");
        return false;
    }
    if(accData.acc_condition.length > 50){
        console.log("OTHR: user input is incorrect!");
        return false;
    }
    if(accData.model_no.length > 50){
        console.log("OTHR: user input is incorrect!");
        return false;
    }
    if(accData.notes.length > 500){
        console.log("OTHR: user input is incorrect!");
        return false;
    }

    //if reached here, everything valid
    console.log("OTHR: user input is correct!");
    return true;
}

module.exports = {
    consolecheck,
    accessoryCheck
}