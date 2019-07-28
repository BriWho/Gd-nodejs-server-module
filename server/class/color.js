var { isFloat } = require('./global.js');
var TYPE = require('./types.js');

class Color{
    constructor(r = 0, g = 0, b = 0, a = 0){
        if(!isFloat(r,g,b,a) || arguments.length > 4)
            throw new Error('constructor arguments are invalid!');
        this.r = r , this.g = g;
        this.b = b , this.a = a;
    }

    static set r(value){
        if(!isFloat(value))
            throw new Error('assignment is invalid!');
        this.r = value;
    }

    static set g(value){
        if(!isFloat(value))
            throw new Error('assignment is invalid!');
        this.g = value;
    }

    static set b(value){
        if(!isFloat(value))
            throw new Error('assignment is invalid!');
        this.b = value;
    }

    static set a(value){
        if(!isFloat(value))
            throw new Error('assignment is invalid!');
        this.a = value;
    }
    toString(){
        return '{r:' + this.r + ',g:' + this.g + 
            ',b:' + this.b + ',a:' + this.a + '}';
    }
    encode(){
        var buffer = Buffer.alloc(16);
        buffer.writeFloatLE(this.r);
        buffer.writeFloatLE(this.g , 4);
        buffer.writeFloatLE(this.b , 8);
        buffer.writeFloatLE(this.a , 12);
        return buffer;
    }
    get TYPE(){
        return TYPE.COLOR;
    }
}

function color(){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(Color , buffer));
}

function isColor(){
    for(var i = 0 ; i < arguments.length ; i++)
        if(!(arguments[i] instanceof Color))
            return false;
    return true;
}

module.exports = {
    Color , color , isColor,
}