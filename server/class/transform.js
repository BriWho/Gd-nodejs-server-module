var { Vector2 , Vector3 , isVector2 , isVector3 } = require('./vector.js');
var { Basis , isBasis } = require('./basis.js');
var TYPE = require('./types.js');

class Transform2D{
    constructor(x , y, origin){
        this.origin = new Vector2();
        this.x = new Vector2();
        this.y = new Vector2();
        if(!isVector2.apply(this, arguments) || arguments.length > 3)
            throw new Error('constructor arguments are no valid!');
        if(x) this.x = x;
        if(y) this.y = y;
        if(origin) this.origin = origin;
    }

    static set origin(value){
        if(!isVector2(value))
            throw new Error('assignment is no valid!');
        this.origin = value;
    }
    static set x(value){
        if(!isVector2(value))
            throw new Error('assignment is no valid!');
        this.x = value;
    }
    static set y(value){
        if(!isVector2(value))
            throw new Error('assignment is no valid!');
        this.y = value;
    }
    toString(){
        return '{x:'+ this.x.toString() + ',y:' + 
        this.y.toString() + ',origin:'+this.origin.toString()+'}';
    }
    encode(){
        var x = this.x.encode();
        var y = this.y.encode();
        var origin = this.origin.encode();
        return Buffer.concat([x , y , origin]);
    }

    get TYPE(){
        return TYPE.TRANSFORM2D;
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

class Transform{
    constructor(x , y , z , origin){
        this.basis = new Basis();
        this.origin = new Vector3();
        var a = arguments , i = 0;

        if(isVector3(a[i],a[i+1] , a[i+2])){
            this.basis.x = a[i++];
            this.basis.y = a[i++];
            this.basis.z = a[i++];
        }else if(isBasis(a[i]))
            this.basis = a[i++];

        if(isVector3(a[i]))
            this.origin = a[i++];

        if(arguments.length !== i)
            throw new Error('constructor arguments are invalid!');
    }

    static set basis(value){
        if(!isBasis(value))
            throw new Error('assignment is invalid!');
        this.basis = value;
    }

    static set origin(value){
        if(!isVector3(value))
            throw new Error('assignment is invalid!');
        this.origin = value;
    }
    toString(){
        return '{basis:'+ this.basis.toString() + ',origin:'+this.origin.toString()+'}';
    }
    encode(){
        var basis = this.basis.encode();
        var origin = this.origin.encode();
        return Buffer.concat([basis , origin]);
    }
    get TYPE(){
        return TYPE.TRANSFORM;
    }
}

function transform(){
    var buffer = Array.from(arguments);
    buffer.unshift(null);
    return new (Function.bind.apply(Transform , buffer));
}

function isTransform(){
    for(var i = 0 ; i < arguments.length ; i++)
        if(!(arguments[i] instanceof Transform))
            return false;
    return true;
}

module.exports = { 
    Transform2D , transform2d , isTransform2D,
    Transform , transform , isTransform
};