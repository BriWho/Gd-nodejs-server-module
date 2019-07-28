var { isFloat } = require('./global.js');
var TYPE = require('./types.js');

class Quat{
    constructor(x = 0,y = 0,z = 0,w = 0){
        if(!isFloat.apply(this , arguments) || arguments.length > 4)
            throw new Error('constructor arguments are no valid!');
        this.x = x, this.y = y;
        this.z = z, this.w = w;
    }

    static set x(value){
        if(!isFloat(value))
            throw new Error('assignment is no valid!');
        this.x = value;
    }
    static set y(value){
        if(!isFloat(value))
            throw new Error('assignment is no valid!');
        this.y = value;
    }    
    static set z(value){
        if(!isFloat(value))
            throw new Error('assignment is no valid!');
        this.z = value;
    }    
    static set w(value){
        if(!isFloat(value))
            throw new Error('assignment is no valid!');
        this.w = value;
    }

    toString(){
        return '{x:' + this.x + ',y:' + this.y + ',z:' + 
            this.z + ',w:' + this.w + '}'; 
    }

    encode(){
        var buffer = Buffer.alloc(16);
        buffer.writeFloatLE(this.x );
        buffer.writeFloatLE(this.y , 4);
        buffer.writeFloatLE(this.z , 8);
        buffer.writeFloatLE(this.w , 12);
        return buffer;
    }

    get TYPE(){
        return TYPE.QUAT;
    }

}

function quat(x= 0 ,y = 0 ,z = 0, w= 0){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(Quat , buffer));
}

function isQuat(){
    for(var i = 0 ; i < arguments.length ; i++)
        if(!(arguments[i] instanceof Quat))
            return false;
    return true;
}

module.exports = { Quat , quat , isQuat }

