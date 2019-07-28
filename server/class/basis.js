var { Vector3, isVector3 } = require('./vector.js');
var TYPE = require('./types.js');

class Basis{
    constructor(x , y, z){
        this.x = new Vector3();
        this.y = new Vector3();
        this.z = new Vector3();
        if(!isVector3.apply(this, arguments) || arguments.length > 3)
            throw new Error('constructor arguments are no valid!');
        this.x = x, this.y = y,this.z = z;
    }

    static set x(value){
        if(!isVector3(value))
            throw new Error('assignment is no valid!');
        this.x = value;
    }
    static set y(value){
        if(!isVector3(value))
            throw new Error('assignment is no valid!');
        this.y = value;
    }
    static set z(value){
        if(!isVector3(value))
            throw new Error('assignment is no valid!');
        this.z = value;
    }

    toString(){
        return '{x:' + this.x.toString() + ',y:' + this.y.toString() + 
            ',z:' + this.z.toString() + '}';
    }

    encode(){
        var x = this.x.encode();
        var y = this.y.encode();
        var z = this.z.encode();
        return Buffer.concat([x , y, z]);
    }

    get TYPE(){
        return TYPE.BASIS;
    }
};

function basis(x , y , z){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(Basis, buffer));
};

function isBasis(x){
    for(var i = 0 ; i < arguments.length ; i++)
        if(!(arguments[i] instanceof Basis))
            return false;
    return true;
};

module.exports = { Basis , basis , isBasis };