var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var server     = require('http').createServer(app);
var io         = require("socket.io")(server);
var socket     = io.sockets;
var port       = 8081;
var path       = require('path');
var dirName    = path.dirname(require.main.filename);

// set app engines
app.set('views',  dirName + '/app/view');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// listen to port 8081
server.listen(port);

exports.express = express;
exports.app = app;
exports.server = server;
exports.io = io;
exports.socket = socket;