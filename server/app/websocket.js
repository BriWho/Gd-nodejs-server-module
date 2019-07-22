const WebSocket = require('ws');
var pack = require('../packet').pack;
var parse = require('../packet').parse;

function startWebSocket(port){
    console.log('start server');
    const wss = new WebSocket.Server({ port : 8080 
    /*  ,
        perMessageDeflate : {
            zlibDeflateOptions : {
                chunkSize: 1024,
                memLevel : 7,
                level: 3
            },
            zlibInflateOptions : {
                chunkSize: 10 * 1024
            },
            clientNoContextTakeover: true,
            serverNoContextTakeover: true,
            serverMaxWindowBits: 10,
            concurrencyLimit : 10,
            threshold : 1024
        }*/
    });

    wss.on('connection' , ws => {

        ws.on('message' , message => {
            var a = parse(message).data;
            var b = pack(a);
            ws.send(b);
        })

        ws.on('close' , () => {

        })

    });

    wss.on('close', () =>{
        
    });
}

exports.start = startWebSocket;

