const net = require('net');
const packet = require('../parse');

var server = net.createServer( socket => {

    socket.on('data' , chunk => {
        var a = packet.decode(chunk).data;
        var b = packet.encode(a);
        socket.write(b);
    });

    socket.on('drain' , () => {

    });

    socket.on('end', () => {
        console.log('socket end');
    });


})

function startserver( port , host = '127.0.0.1'){

    server.listen( port , host , () => {
        console.log(`Server listening on localhost: ${port}`); 
    });

    server.maxConnections = 25;

    server.on('connection' , socket => {
        console.log('start connection ...');
    });

    server.on('error' , err => {
        if( err.code === 'EADDRINUSE'){
            console.log('Address in use, retrying...');
            setTimeout(() => {
                server.close();
                server.listen(port);
            } , 1000);
        }
    });
}

function close(cb){
    server.close(() => {
        console.log(cb);
    });
};

exports.start = startserver;
exports.close = close;