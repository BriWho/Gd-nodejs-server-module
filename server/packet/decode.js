var TYPE = require('../class');

function decode(packet){
    var buffer = Buffer.from(packet);
    var size = packet.readUInt32LE(0);
    
    buffer = buffer.slice(4);
    var items = parse(buffer);

    return {
        data : items.data,
        length : size + 4
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
    9 : parsePlane,
    10: parseQuat,
    11: parseAABB,
    12: parseBasis,
    13: parseTransform,
    14: parseColor,
    18: parseDict,
    19: parseArray,
    20: parseByteArray,
    21: parseIntArray,
    22: parseRealArray,
    23: parseStringArray,
    24: parseVector2Array,
    25: parseVector3Array,
    26: parseColorArray
}

function parse(buffer , offset = 0){
    var t = buffer.readUInt32LE( offset );
    offset += 4;
    var item = parsing[0](buffer , offset);
    if(t in parsing)
        item = parsing[t](buffer , offset);

    // others datas t > TYPE.MAX
    return {
        data : item.data,
        length : item.length + 4
    };
}

function parseBool(buffer , offset){
    return {
        data : buffer.readInt8(offset) !== 0,
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
    var x = parseFloat(buffer , offset);
    var y = parseFloat(buffer , offset + x.length);
    return {
        data : new TYPE.Vector2(x.data, y.data),
        length : x.length + y.length
    }
}

function parseRect2(buffer , offset){
    var pos = parseVector2(buffer , offset);
    var size = parseVector2(buffer , offset + pos.length);

    return {
        data : new TYPE.Rect2(pos.data , size.data),
        length : pos.length + size.length
    }
}

function parseVector3(buffer ,offset){
    var x = parseFloat(buffer , offset);
    var y = parseFloat(buffer , offset + x.length);
    var z = parseFloat(buffer , offset + x.length + y.length);
    return {
        data : new TYPE.Vector3(x.data,y.data,z.data),
        length : x.length + y.length + z.length
    }
}

function parseTransform2D(buffer , offset){
    var x = parseVector2(buffer , offset );
    var y = parseVector2(buffer , offset + x.length);
    var origin = parseVector2(buffer , offset + x.length + y.length);

    return {
        data : new TYPE.Transform2D(x.data ,y.data , origin.data),
        length : x.length + y.length + origin.length
    }
}

function parsePlane(buffer , offset){
    var a = parseFloat(buffer , offset);
    var b = parseFloat(buffer , offset + a.length);
    var c = parseFloat(buffer , offset + a.length + b.length);
    var d = parseFloat(buffer , offset + a.length + b.length + c.length);
    return {
        data : new TYPE.Plane(a.data ,b.data ,c.data,d.data),
        length : a.length + b.length + c.length + d.length
    }
}

function parseQuat(buffer , offset){
    var x = parseFloat(buffer, offset);
    var y = parseFloat(buffer ,offset + x.length);
    var z = parseFloat(buffer ,offset + x.length + y.length);
    var w = parseFloat(buffer, offset + x.length + y.length + z.length);
    return {
        data : new TYPE.Quat(x.data,y.data,z.data,w.data),
        length : x.length + y.length + z.length + w.length
    }
}

function parseAABB(buffer , offset){
    var pos = parseVector3(buffer , offset);
    var size = parseVector3(buffer , offset + pos.length );
    return {
        data : new TYPE.AABB(pos.data , size.data),
        length : pos.length + size.length
    }
}

function parseBasis(buffer , offset){
    var x = parseVector3(buffer , offset);
    var y = parseVector3(buffer , offset + x.length);
    var z = parseVector3(buffer , offset + x.length + y.length);
    return {
        data : new TYPE.Basis(x.data,y.data,z.data),
        length : x.length + y.length + z.length
    }
}

function parseTransform(buffer , offset){
    var basis = parseBasis(buffer , offset);
    var origin = parseVector3(buffer , offset + basis.length);
    return {
        data : new TYPE.Transform(basis.data , origin.data),
        length : basis.length + origin.length
    }
}

function parseColor(buffer , offset){
    var r = parseFloat(buffer , offset);
    var g = parseFloat(buffer , offset + r.length);
    var b = parseFloat(buffer , offset + r.length + g.length);
    var a = parseFloat(buffer , offset + r.length + g.length + b.length);
    return {
        data : new TYPE.Color(r.data , g.data , b.data , a.data),
        length : r.length + g.length + b.length + a.length
    }
}

function parseDict(buffer , offset){
    var n = buffer.readUInt32LE(offset);
    var ret = {};
    var length = 0;
    for( i = 0 ; i < n ;i++){
        var a = parse(buffer , offset + 4 + length);
        length += a.length;
        var b = parse(buffer , offset + 4 + length);
        length += b.length;
        ret[a.data] = b.data;
    }
    return {
        data : ret, 
        length : length + 4
    }
}

function parseArray(buffer , offset){
    var n = buffer.readUInt32LE(offset);
    var arr = [] , length = 4;
    for(var i = 0 ; i < n ; i++){
        var item = parse(buffer , offset + length);
        arr.push(item.data);
        length += item.length;
    }

    return {
        data : arr,
        length : length
    }
}

function parseByteArray(buffer , offset){
    var n = buffer.readUInt32LE(offset);
    n = n - (n%4) + (n%4!==0) * 4;
    var arr = new Uint8Array(n) , length = 4;
    for(var i = 0 ; i < n ;i++){
        var item = buffer.readUInt8(offset + length);
        arr[i] = item;
        length ++;
    }

    length = length - (length % 4) + (length % 4 !== 0) * 4;
    return {
        data : arr,
        length : length
    }
}

function parseIntArray(buffer , offset){
    var n = buffer.readUInt32LE(offset);
    var arr = new Int32Array(n) , length = 4;
    for(var i = 0 ; i < n ;i++){
        var item = parseInt(buffer , offset + length);
        arr[i] = item.data;
        length += item.length;
    }

    return {
        data : arr,
        length : length
    }
}

function parseRealArray(buffer ,offset){
    var n =buffer.readUInt32LE(offset);
    var arr = new Float32Array(n) , length = 4;
    for(var i = 0 ; i < n ;i++){
        var item = parseFloat(buffer , offset + length);
        arr[i] = item.data;
        length += item.length;
    }

    return {
        data : arr,
        length : length
    }
}

function parseStringArray(buffer ,offset){
    var n =buffer.readUInt32LE(offset);
    var arr = [] , length = 4;
    for(var i = 0 ; i < n ;i++){
        var item = parseString(buffer , offset + length);
        arr.push(item.data);
        length += item.length;
    }

    return {
        data : arr,
        length : length
    }
}

function parseVector2Array(buffer ,offset){
    var n =buffer.readUInt32LE(offset);
    var arr = [] , length = 4;
    for(var i = 0 ; i < n ;i++){
        var item = parseVector2(buffer , offset + length);
        arr.push(item.data);
        length += item.length;
    }

    return {
        data : arr,
        length : length
    }
}

function parseVector3Array(buffer ,offset){
    var n =buffer.readUInt32LE(offset);
    var arr = [] , length = 4;
    for(var i = 0 ; i < n ;i++){
        var item = parseVector3(buffer , offset + length);
        arr.push(item.data);
        length += item.length;
    }

    return {
        data : arr,
        length : length 
    }
}

function parseColorArray(buffer ,offset){
    var n =buffer.readUInt32LE(offset);
    var arr = [] , length = 4;
    for(var i = 0 ; i < n ;i++){
        var item = parseColor(buffer , offset + length);
        arr.push(item.data);
        length += item.length;
    }

    return {
        data : arr,
        length : length
    }
}

exports.decode = decode;
exports.parse = parse;
