var uniqid = require('uniqid');
var { decode , encode } = require('./packet');
var clients = {};

function _init(socket){
    var uid = uniqid();
    clients[uid] = socket;
    return uid;
}

function _end(uid , socket){
    delete clients[uid];
}

function request(uid , socket , chunk){
    var a = decode(chunk).data;
    var b = encode(a);
    socket.write(b);
}

function sendtoAll(uid , socket , data){
    for(var id in clients){
        if(uid == id) continue;

    }
}

exports.init = _init;
exports.request = request;
exports.end = _end;