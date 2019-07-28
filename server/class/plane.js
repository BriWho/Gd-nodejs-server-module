var { isFloat } = require('./global.js');
var TYPE = require('./types.js');

class Plane{
    constructor(a = 0, b = 0, c = 0, d = 0){
        if(!isFloat.apply(this, arguments) || arguments.length > 4)
            throw new Error('constructor arguments are no valid!');
        this.a = a, this.b = b;
        this.c = c, this.d = d;
    }
    static set a(value){
        if(!isFloat(value))
            throw new Error('assignment is no valid!');
        this.a = value;
    }
    static set b(value){
        if(!isFloat(value))
            throw new Error('assignment is no valid!');
        this.b = value;
    }
    static set c(value){
        if(!isFloat(value))
            throw new Error('assignment is no valid!');
        this.c = value;
    }
    static set d(value){
        if(!isFloat(value))
            throw new Error('assignment is no valid!');
        this.d = value;
    }

    toString(){
        return '{a:' + this.a + ',b:' + this.b +
            ',c:' + this.c + ',d:' + this.d +'}';
    }
    toEquation(){
        return `${this.a}x+${this.b}y+${this.c}z=${this.d}`;
    }
    encode(){
        var buffer = Buffer.alloc(16);
        buffer.writeFloatLE(this.a );
        buffer.writeFloatLE(this.b , 4);
        buffer.writeFloatLE(this.c , 8);
        buffer.writeFloatLE(this.d , 12);
        return buffer;
    }

    get TYPE(){
        return TYPE.PLANE;
    }
};

function plane(x , y , origin){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(Plane , buffer));
};

function isPlane(x){
    for(var i = 0 ; i < arguments.length ; i++)
        if(!(arguments[i] instanceof Plane))
            return false;
    return true;
};

module.exports = { Plane , plane , isPlane };