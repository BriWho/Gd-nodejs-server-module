var TYPE = require('../class');

function Decode(packet){
    var buffer = Buffer.from(packet);
    var size = packet.readUInt32LE(0);
    
    console.log(buffer);
    buffer = buffer.slice(4);
    var items = parse(buffer , 0); 

    return {
        data : items.data,
        length : size
    }
}

function parse(buffer , offset){
    var t = buffer.readUInt32LE( offset );
    offset += 4;
    switch(t){
        case TYPE.NIL: return { data : null , length : 0 };
        case TYPE.BOOL: return parseBool(buffer , offset);
        case TYPE.INT: return parseInt(buffer , offset);
        case TYPE.INT64: return parseInt64( buffer , offset);
        case TYPE.FLOAT: return parseFloat( buffer , offset);
        case TYPE.REAL: return parseReal( buffer , offset);
        case TYPE.STRING: return parseString(buffer, offset);
        case TYPE.VECTOR2: return parseVector2(buffer , offset);
        case TYPE.RECT2: return parseRect2(buffer , offset);
        case TYPE.VECTOR3: return parseVector3(buffer , offset);
        case TYPE.TRANSFORM2D: return parseTransform2D(buffer , offset);
        case TYPE.PLANE: return parsePlane(buffer , offset);
    }

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