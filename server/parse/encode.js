const TYPE = require('../class');

function Encode(data){
    var buffer = Buffer.alloc(4);
    var packet = pack(data);
    buffer.writeUInt32LE(packet.length);
    return Buffer.concat([buffer , packet]);
};

const packing = {
    'boolean' : encodeBool,
    'number' : encodeDouble,
    'string' : encodeString,
    'object' : data => {
        if(data.encode){
            return data.encode();
        }else ;
    },
    'function' : encodeNull
}

function pack(data){
    if(data === null)
        return encodeNull()

    var type = typeof data;

    return packing[type](data);
}

function encodeNull(){
    return Buffer.alloc(4);
}

function encodeBool(data){
    var buffer = Buffer.alloc(8);
    buffer.writeInt32LE(TYPE.BOOL);
    buffer.writeInt32LE(data + 0,4);
    return buffer;
}

function encodeDouble(data){
    var buffer = Buffer.alloc(12);
    buffer.writeInt32LE(TYPE.REAL);
    buffer.writeDoubleLE(data , 4);
    return buffer;
}

function encodeString(data){
    var len = data.length - (data.length % 4) + (data.length % 4 !== 0) * 4;
    var buffer = Buffer.alloc(4 + len);
    buffer.writeInt32LE(TYPE.STRING);
    buffer.write(data , 4);
    return buffer;
}

module.exports = Encode;