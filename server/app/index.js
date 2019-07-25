
module.exports = function(proto){
    try{
        if(typeof proto === 'string')
            proto = proto.toLowerCase();
        else
            throw new Error('Argument is not a string');

        if( proto === 'udp')
            return require('./udp.js');
        
        if( proto === 'tcp')
            return require('./tcp.js');

        if( proto === 'ws' || proto === 'webserver')
            return require('./websocket.js');


        throw new Error('Not found the server \'' + server + '\'');
    }catch(e){
        console.log('Argument error: ' + e.message);
    }
}
