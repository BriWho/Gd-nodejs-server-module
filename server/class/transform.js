var v = require('./vector.js');
var g = require('./global.js');
var TYPE = require('./types.js');

class Transform2D{
    constructor(x , y, origin){
        this.origin = new v.Vector2();
        this.x = new v.Vector2();
        this.y = new v.Vector2();
        if(!v.isVector2.apply(this, arguments) || arguments.length > 3)
            throw new Error('constructor arguments are no valid!');
        if(x) this.x = x;
        if(y) this.y = y;
        if(origin) this.origin = origin;
    }

    static set origin(value){
        if(!v.isVector2(value))
            throw new Error('assignment is no valid!');
        this.origin = value;
    }
    static set x(value){
        if(!v.isVector2(value))
            throw new Error('assignment is no valid!');
        this.x = value;
    }
    static set y(value){
        if(!v.isVector2(value))
            throw new Error('assignment is no valid!');
        this.y = value;
    }
    toString(){
        return '{x:'+ this.x.toString() + ',y:' + 
        this.y.toString() + ',origin:'+this.origin.toString()+'}';
    }
    encode(){
        var buffer = Buffer.alloc(28);
        buffer.writeInt32LE(TYPE.TRANSFORM2D);
        buffer.writeFloatLE(this.x.x , 4);
        buffer.writeFloatLE(this.x.y , 8);
        buffer.writeFloatLE(this.y.x , 12);
        buffer.writeFloatLE(this.y.y , 16);
        buffer.writeFloatLE(this.origin.x , 20);
        buffer.writeFloatLE(this.origin.y , 24);
        return buffer;
    }
    
};

function transform2d(x , y , origin){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(Transform2D , buffer));
};

function isTransform2D(x){
    for(var i = 0 ; i < arguments.length ; i++)
        if(!(arguments[i] instanceof Transform2D))
            return false;
    return true;
};

module.exports = { Transform2D , transform2d , isTransform2D };