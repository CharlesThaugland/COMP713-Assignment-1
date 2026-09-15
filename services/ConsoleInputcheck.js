//check to see if the console input was valid
function consolecheck(consoleData){
    //check each value in each text field to see if exceeds limit
    if(consoleData.name.length > 100){
        return false;
    }
    if(consoleData.console_condition.length > 50){
        return false;
    }
    if(consoleData.model_no.length > 50){
        return false;
    }
    if(consoleData.notes.length > 1000){
        return false;
    }

    //attempt to convert value to decimal
    const value = parseFloat(consoleData.value)
    
    //check to se if it was a valid decimal and fits within range
    if(Number.isNaN(value)){
        return false;
    }
    if(value < 0 || value > 9999999.99){
        return false;
    }

    //if reached here, everything valid
    return true;
}