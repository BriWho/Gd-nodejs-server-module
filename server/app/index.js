
module.exports = function(proto){
    try{
        if(typeof proto === 'string')
            proto = proto.toLowerCase();
        else
            throw new Error('Argument is not a string');

        if( proto === 'tcp')
            return require('./tcp.js');

        throw new Error('Not found the server \'' + server + '\'');
    }catch(e){
        console.log('Argument error: ' + e.message);
    }
}
