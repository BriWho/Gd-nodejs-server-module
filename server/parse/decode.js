var TYPE = require('../class');

function Decode(packet){
    var buffer = Buffer.from(packet);
    var size = packet.readUInt32LE(0);
    
    buffer = buffer.slice(4);
    var items = parse(buffer , 0); 

    return {
        data : items.data,
        length : size
    }
}
const parsing = {
    0 : () => {return { data : null , length : 0}},
    1 : parseBool,
    2 : parseInt,
    0x00010002: parseInt64,
    3 : parseFloat,
    0x00010003: parseReal,
    4 : parseString,
    5 : parseVector2,
    6 : parseRect2,
    7 : parseVector3,
    8 : parseTransform2D,
    9 : parsePlane
}

function parse(buffer , offset){
    var t = buffer.readUInt32LE( offset );
    offset += 4;
    if(t in parsing)
        return parsing[t](buffer , offset);

    // others datas t > TYPE.MAX
    return null;
}

function parseBool(buffer , offset){
    return {
        data : buffer.readInt32LE(offset) !== 0,
        length : 4
    }
}

function parseInt(buffer , offset){
    return { 
        data : buffer.readInt32LE(offset),
        length : 4
    }
}

function parseInt64(buffer , offset){

    return {
        data : buffer.readBigInt64LE(offset),
        length : 8
    }
}

function parseFloat( buffer , offset){
    return {
        data : buffer.readFloatLE(offset),
        length : 4
    }
}

function parseReal(buffer , offset){
    return { 
        data : buffer.readDoubleLE(offset),
        length : 8
    }
}

function parseString(buffer , offset){
    var strlen = buffer.readUInt32LE(offset);
    var len = strlen - (strlen % 4) + (strlen % 4 !== 0) * 4;
    offset += 4;
    return {
        data : buffer.toString('utf8' , offset , offset + strlen),
        length : len + 4
    }
}

function parseVector2(buffer , offset){
    var a = buffer.readFloatLE(offset);
    var b = buffer.readFloatLE(offset + 4);
    return {
        data : new TYPE.Vector2(a, b),
        length : 8
    }
}

function parseRect2(buffer , offset){
    var pos = parseVector2(buffer , offset).data;
    var size = parseVector2(buffer , offset + 8).data;

    return {
        data : new TYPE.Rect2(pos , size),
        length : 12
    }
}

function parseVector3(buffer ,offset){
    var x = buffer.readFloatLE(offset);
    var y = buffer.readFloatLE(offset + 4);
    var z = buffer.readFloatLE(offset + 8);
    return {
        data : new TYPE.Vector3(x,y,z),
        length : 12
    }
}

function parseTransform2D(buffer , offset){
    var x = parseVector2(buffer , offset ).data;
    var y = parseVector2(buffer , offset + 8).data;
    var origin = parseVector2(buffer , offset + 16).data;

    return {
        data : new TYPE.Transform2D(x ,y , origin),
        length : 24
    }
}

function parsePlane(buffer , offset){
    var a = buffer.readFloatLE(offset);
    var b = buffer.readFloatLE(offset + 4);
    var c = buffer.readFloatLE(offset + 8);
    var d = buffer.readFloatLE(offset + 12);
    return {
        data : new TYPE.Plane(a,b,c,d),
        length : 16
    }
}

module.exports = Decode;