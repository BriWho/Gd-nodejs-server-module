var uniqid = require('uniqid');
var clients = {};

function _init(socket){
    var uid = uniqid();
    clients[uid] = socket;
    return uid;
}

function _end(id , socket){
    delete clients[id];
}

function request(id , socket , chunk){


}

exports.init = _init;
exports.request = request;
exports.end = _end;