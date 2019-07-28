const TYPE = require('../class');

function encode(data){
    var buffer = Buffer.alloc(4);
    var packet = pack(data);
    buffer.writeUInt32LE(packet.length);
    return Buffer.concat([buffer , packet]);
};

function pack(data){
    var buffer = Buffer.alloc(4);
    if(data === null)
        return buffer;
    buffer.writeInt32LE(data.TYPE);
    var packet = null;
    if(data.encode)
        packet = data.encode();
    else{
        var size = 0;
        packet = Buffer.alloc(4);
        for(var key in data){
            if(data.hasOwnProperty(key)){
                var a = pack(key);
                var b = pack(data[key]);
                packet = Buffer.concat([packet , a ,b]);
                size++;
            }
        }
        packet.writeUInt32LE(size);
    }
    
    return Buffer.concat([buffer , packet]);
}

Boolean.prototype.encode = function encode(){
    var buffer = Buffer.alloc(4);
    buffer.writeInt32LE(this.valueOf() + 0);
    return buffer;
}

Number.prototype.encode = function encode(){
    var buffer = Buffer.alloc(8);
    buffer.writeDoubleLE(this.valueOf());
    return buffer;
}

String.prototype.encode = function encode(){
    var len = this.length - (this.length % 4) + (this.length % 4 !== 0) * 4;
    var buffer = Buffer.alloc(4 + len);
    buffer.writeUInt32LE(this.length);
    buffer.write(this.valueOf() , 4);
    return buffer;
}

BigInt.prototype.encode = function encode(){
    var buffer = Buffer.alloc(8);
    buffer.writeBigInt64LE(this.valueOf());
    return buffer;
}

Array.prototype.encode = function encode(){
    var val = this.valueOf();
    var buffer = Buffer.alloc(4);
    buffer.writeUInt32LE(val.length);

    if(val.every(function(x) { return typeof x === 'string'})){
        Array.prototype.TYPE = TYPE.STRING_ARRAY;
    }else if(TYPE.isVector2.apply(this , val)){
        Array.prototype.TYPE = TYPE.VECTOR2_ARRAY;
    }else if(TYPE.isVector3.apply(this , val)){
        Array.prototype.TYPE = TYPE.VECTOR3_ARRAY;
    }else if(TYPE.isColor.apply(this , val)){
        Array.prototype.TYPE = TYPE.COLOR_ARRAY;
    }else{
        for(var i = 0 ; i < val.length ; i++)
            buffer = Buffer.concat([buffer , pack(val[i])]);

        Array.prototype.TYPE = TYPE.ARRAY;
        return buffer;
    }
    for(var i = 0 ;i < val.length ; i++)
        buffer = Buffer.concat([buffer , val[i].encode()]);
    return buffer;
}

Uint8Array.prototype.encode = function encode(){
    var val = this.valueOf();
    var length = val.length - (val.length % 4) + (val.length % 4 !== 0) * 4;
    var buffer = Buffer.alloc(4 +length);
    buffer.writeUInt32LE(val.length);
    
    for(var i = 0 ; i < val.length ; i++)
        buffer.writeUInt8( val[i] , 4 + i);
    return buffer;
}

Int32Array.prototype.encode = function encode(){
    var val = this.valueOf();
    var buffer = Buffer.alloc(4 + val.length * 4);
    buffer.writeUInt32LE(val.length);

    for(var i = 0 ; i < val.length ; i++)
        buffer.writeInt32LE(val[i] , 4 + 4 * i);
    return buffer;
}

Float32Array.prototype.encode = function encode(){
    var val = this.valueOf();
    var buffer = Buffer.alloc(4 + val.length * 4);
    buffer.writeUInt32LE(val.length);

    for(var i = 0 ; i < val.length ; i++ )
        buffer.writeFloatLE(val[i] , 4 + 4* i);
    return buffer;
}

Boolean.prototype.TYPE = TYPE.BOOL;
Number.prototype.TYPE = TYPE.REAL;
String.prototype.TYPE = TYPE.STRING;
BigInt.prototype.TYPE = TYPE.INT64;
Uint8Array.prototype.TYPE = TYPE.RAW_ARRAY;
Int32Array.prototype.TYPE = TYPE.INT_ARRAY;
Float32Array.prototype.TYPE = TYPE.REAL_ARRAY;
Object.prototype.TYPE = TYPE.DICTIONARY;

exports.encode = encode;
exports.pack = pack;