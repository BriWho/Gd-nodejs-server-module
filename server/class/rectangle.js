var v = require('./vector.js');
var g = require('./global.js');
var TYPE = require('./types.js');

const node = {
    0 : { 1: g.isFloat , 2: v.isVector2 , 'n': null },
    1 : { 2: g.isFloat , 'n': null },
    2 : { 3: g.isFloat , 4: v.isVector2 , 'n': null },
    3 : { 4: g.isFloat , 'n': null },
    4 : null
};

/**
 * 
 * @constructor
 * @param { v.Vector2 } position class Vector2(x, y) 
 * @param { v.Vector2 } size class Vector2(x, y)
 */
class Rect2{
    constructor(position, size){
        this.position = new v.Vector2();
        this.size = new v.Vector2();
        var a = arguments, root = node[0];
        for(var i = 0 ; i < a.length ; i++){
            if(root === null)
                throw new Error('constructor arguments are no valid!');
            for(var idx in root){
                if(idx == 'n') 
                    throw new Error('constructor arguments are no valid!')
                if(root[idx](a[i])){
                    if(idx == 1 && i == 0) this.position.x = a[i];
                    if(idx == 2 && i == 0) this.position = a[i];
                    if(idx == 2 && i == 1) this.position.y = a[i]; 
                    if(idx == 3 && i == 1) this.size.x = a[i];
                    if(idx == 3 && i == 2) this.size.x = a[i];
                    if(idx == 4 && i == 1) this.size = a[i];
                    if(idx == 4 && i == 2) this.size.y = a[i];
                    if(idx == 4 && i == 3) this.size.y = a[i];
                    root = node[idx];
                    break;
                }
            }
        }
    };

    static set position(value){
        if(!v.isVector2(value)) throw new Error('assignment is no valid!');
        this.position = value;
    }
    static set size(value){
        if(!v.isVector2(value)) throw new Error('assignment is no valid!');
        this.size = value;
    }
    toString(){
        return '{position:'+ this.position.toString() +
            ',size:' + this.size.toString() + '}'
    }
    encode(){
        var buffer = Buffer.alloc(20);
        buffer.writeInt32LE(TYPE.RECT2);
        buffer.writeFloatLE(this.position.x , 4);
        buffer.writeFloatLE(this.position.y , 8);
        buffer.writeFloatLE(this.size.x , 12);
        buffer.writeFloatLE(this.size.y , 16);
        return buffer;
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