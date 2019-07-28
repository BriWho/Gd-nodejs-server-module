const { isFloat } = require('./global.js');
const TYPE = require('./types.js');
/**
 * 
 * @constructor
 * @param {number} x float value
 * @param {number} y float value
 */
class Vector2{
    constructor(x = 0 , y = 0){
        if(!isFloat(x,y) || arguments.length > 2)
            throw new Error('constructor arguments are invalid!');
        this.x = x,this.y = y;
    }
    static set x(value){
        if(!isFloat(value)) throw new Error('assignment is invalid!');;
        this.x = value;
    }
    static set y(value){
        if(!isFloat(value)) throw new Error('assignment is invalid!');;
        this.y = value;
    }

    toString(){
        return `(${this.x},${this.y})`;
    }

    encode(){
        var buffer = Buffer.alloc(8);
        buffer.writeFloatLE( this.x);
        buffer.writeFloatLE( this.y , 4);
        return buffer;
    }

    get TYPE(){
        return TYPE.VECTOR2;
    }
};
/**
 * 
 * @param {number} x float value
 * @param {number} y float value
 * @returns {Vector2} class Vector2( x , y )
 */
function vector2(x , y ){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(Vector2 , buffer));
};

function isVector2(x){
    for(var i = 0 ; i < arguments.length ; i++){
        if(!(arguments[i] instanceof Vector2) )
            return false;
        if('z' in arguments[i])
            return false;
    };
    return true;
};
/**
 * @constructor
 * @param {number} x float value
 * @param {number} y float value
 * @param {number} z float value
 */
class Vector3 extends Vector2{
    constructor(x = 0 , y = 0 , z = 0){
        super(x , y);
        if(!isFloat(z) || arguments.length > 3)
            throw new Error('constructor arguments are invalid!');
        this.z = z;
    }
    static set z(value){
        if(!isFloat(value)) throw new Error('assignment is invalid!');
        this.z = value;
    }

    toString(){
        return `(${this.x},${this.y},${this.z})`;
    };

    encode(){
        var buffer = Buffer.alloc(12);
        buffer.writeFloatLE( this.x );
        buffer.writeFloatLE( this.y , 4);
        buffer.writeFloatLE( this.z , 8);
        return buffer;
    };

    get TYPE(){
        return TYPE.VECTOR3;
    };
};

/**
 * 
 * @param {number} x float value
 * @param {number} y float value
 * @param {number} z float value
 * @returns { Vector3 } class Vector3( x , y , z )
 */
function vector3(x = 0 , y = 0 , z = 0){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(Vector3 , buffer));
};

function isVector3(x){
    for(var i = 0 ; i < arguments.length ; i++)
        if(!(arguments[i] instanceof Vector3))
            return false;
    return true;
};

module.exports = { 
    Vector2 , vector2 , isVector2,
    Vector3 , vector3 , isVector3
};