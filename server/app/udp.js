const dgram = require('dgram');

function startServer(port , host , client){

    const server = dgram.createSocket('udp4');
    
    server.on('error' , err => {
        console.log(`server error:\n ${err.stack}`)
        server.close();
    })

    server.on('message' , (msg , rinfo) =>{
    //    server.send(msg , rinfo.port , rinfo.address);
    })

    server.on('listening' , () =>{
        const address = server.address();
        console.log(`server listening on ${address.address}:${address.port}`);
    });

    server.bind(port);

}

exports.start = startServer;