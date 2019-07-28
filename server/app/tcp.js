const net = require('net');

function startserver( port , host = '127.0.0.1', client){

    var server = net.createServer( socket => {

        var uid = client.init(socket);

        socket.on('data' , chunk => {
            client.request(uid , socket , chunk);
        });
    
        socket.on('drain' , () => {
    
        });
    
        socket.on('end', () => {
            client.end(uid , socket );
        });
    
    });

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

exports.start = startserver;