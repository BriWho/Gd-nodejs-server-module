
const MAX_INT32 = 2147483647;
const MIN_INT32 = -2147483648;
const MAX_INT64 = 9223372036854775807;
const MIN_INT64 = -9223372036854775808;

function isInt32(x){
    for(var i = 0 ; i < arguments.length ; i++){
        var y = arguments[i];
        if(typeof y !== 'number' || y > MAX_INT32 || y < MIN_INT32)
            return false;
    }
    return true; 
}

function isInt64(x){
    for(var i = 0 ; i < arguments.length ; i++){
        var y = arguments[i];
        if(typeof y !== 'number' || y > MAX_INT64 || y < MIN_INT64)
            return false;
    }
    return true;
}

function isFloat(x){
    for(var i = 0 ; i < arguments.length ; i++)
        if(typeof arguments[i] !== 'number')
            return false;
    return true;
}

module.exports = { isInt32 , isInt64 , isFloat }