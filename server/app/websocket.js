const WebSocket = require('ws');

function startWebSocket(port , host , client){
    const wss = new WebSocket.Server({ port : port });
    console.log('server listening on ws://localhost:' + port);

    wss.on('connection' , ws => {
        
        var uid = client.init(ws);

        ws.on('message' , message => {
            
        //    client.request(uid , ws , message );
        })

        ws.on('close' , () => {
            client.end();
        })

    });

    wss.on('close', () =>{
        
    });
}

exports.start = startWebSocket;

