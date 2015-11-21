var express      = require("express");
var app          = express();
var bodyParser   = require("body-parser");
var server       = require('http').createServer(app);
var io           = require("socket.io")(server);
var socket       = io.sockets;
var port         = 8081;
var path         = require('path');
var dirName      = path.dirname(require.main.filename);
var baseUrl      = "http://localhost:8081";
var session      = require('client-sessions');

// set app engines
app.set('views',  dirName + '/app/view');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/webroot', express.static( dirName + '/webroot'));
app.use(session({
  cookieName: 'session',
  secret: 'karenkate',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// listen to port 8081
server.listen(port);

// export objects
exports.express = express;
exports.app     = app;
exports.server  = server;
exports.io      = io;
exports.socket  = socket;
exports.baseUrl = baseUrl;
exports.session = session;