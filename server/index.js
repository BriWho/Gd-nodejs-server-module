const server = require('./app')('tcp');
const client = require('./client')
const port = 8080;
const host = '127.0.0.1';

server.start(port , host , client);














