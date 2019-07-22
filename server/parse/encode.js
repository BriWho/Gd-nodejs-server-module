const TYPE = require('../class');

function Encode(data){
    var buffer = Buffer.alloc(4);
    var packet = pack(data);
    console.log(packet);
    buffer.writeUInt32LE(packet.length);
    return Buffer.concat([buffer , packet]);
};

function pack(data){
    var type = typeof data;
    if(data === null) return encodeNull();
    if(type === 'boolean') return encodeBool(data);
    if(type === 'number') return encodeDouble(data);
    if(type === 'string') return encodeString(data);
    if(type === 'object'){
        if(data.encode){
            return data.encode();
        }else{
            
        }
    }
    if(type === 'function'){
        console.log('function');
    }
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