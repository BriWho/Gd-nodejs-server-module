var { Vector3 , isVector3 } = require('./vector.js');
var TYPE = require('./types.js');

class AABB{
    constructor(position , size){
        this.position = new Vector3();
        this.size = new Vector3();
        if(!isVector3(position , size) || arguments.length > 2)
            throw new Error('constructor arguments are no valid');
        this.position = position;
        this.size = size;
    }

    static set position(value){
        if(!isVector3(value))
            throw new Error('assignment is no valid');
        this.position = value;
    }
    static set size(value){
        if(!isVector3(value))
            throw new Error('assignment is no valid');
        this.size = value;
    }

    toString(){
        return '{position:' + this.position.toString() +
        ',size:' + this.size.toString() + '}';
    }

    encode(){
        var pos = this.position.encode();
        var size = this.size.encode();
        return Buffer.concat([pos , size]);
    }

    get TYPE(){
        return TYPE.AABB;
    }
}

function aabb(position = 0, size= 0){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(AABB , buffer));
}

function isAABB(){
    for(var i = 0 ; i < arguments.length ; i++)
        if(!(arguments[i] instanceof AABB))
            return false;
    return true;
}

module.exports = { AABB , aabb , isAABB }