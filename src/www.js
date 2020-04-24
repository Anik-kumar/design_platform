#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('advancednodeexpress:server');
const http = require('http');
var configLoader = require('./config/ConfigLoader');
var path = require('path');

// Load Node-config
let config = new configLoader();
process.env['SOURCE_PATH'] = path.resolve(__dirname);
process.env['ROOT_PATH'] = process.env['SOURCE_PATH'].substring(0, process.env['SOURCE_PATH'].lastIndexOf("/src"));

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

const unhandledRejections = new Map();
// In synchronous code, the 'uncaughtException' event is emitted when the list of unhandled exceptions grows.
// In asynchronous code, the 'unhandledRejection' event is emitted when the list of unhandled rejections grows,
// and the 'rejectionHandled' event is emitted when the list of unhandled rejections shrinks.
// The unhandledRejections Map will grow and shrink over time, reflecting rejections that start unhandled and then become handled
process.on('unhandledRejection', (reason, promise) => {
    unhandledRejections.set(promise, reason);
}, error => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection >>>> ', error);
});
process.on('rejectionHandled', (promise) => {
    unhandledRejections.delete(promise);
});

process.on('uncaughtException', (err, origin) => {
    console.log('uncaughtException >>>> ', err);
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// https://www.npmjs.com/package/mathjax3
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('***** Server is Listening on http://localhost:'+addr.port);
}
