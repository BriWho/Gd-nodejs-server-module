var { Vector2 , isVector2 } = require('./vector.js');
var { isFloat } = require('./global.js');
var TYPE = require('./types.js');

/**
 * 
 * @constructor
 * @param { v.Vector2 } position class Vector2(x, y) 
 * @param { v.Vector2 } size class Vector2(x, y)
 */
class Rect2{
    constructor(position, size){
        this.position = new Vector2();
        this.size = new Vector2();
        var a = arguments , i = 0;

        if( isVector2(a[i]) ){
            this.position = a[i++];
        }else if( isFloat(a[i],a[i+1])){
            this.position.x = a[i++];
            this.position.y = a[i++];
        }

        if( isVector2(a[i])){
            this.size = a[i++];
        }else if(isFloat(a[i],a[i+1])){
            this.size.x = a[i++];
            this.size.y = a[i++];
        }

        if( i !== arguments.length )
            throw new Error('constructor arguments are no invalid!');
    };

    static set position(value){
        if(!isVector2(value)) throw new Error('assignment is no valid!');
        this.position = value;
    }
    static set size(value){
        if(!isVector2(value)) throw new Error('assignment is no valid!');
        this.size = value;
    }
    toString(){
        return '{position:'+ this.position.toString() +
            ',size:' + this.size.toString() + '}'
    }
    encode(){
        var pos = this.position.encode();
        var size = this.size.encode();
        return Buffer.concat([pos , size]);
    }

    get TYPE(){
        return TYPE.RECT2;
    }
};
/**
 * 
 * @param {v.Vector2 } position float value
 * @param {v.Vector2 } size float value
 * @returns {v.Vector2} class Vector2( x , y )
 */
function rect2(position , size){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(Rect2 , buffer));
};

function isRect2(x){
    for(var i = 0 ; i < arguments.length ; i++)
        if(!(arguments[i] instanceof Rect2))
            return false;
    return true;
};

module.exports = { Rect2 , rect2 , isRect2 };