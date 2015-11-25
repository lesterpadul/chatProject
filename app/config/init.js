var express    = require("express");
var session    = require('client-sessions');
var app        = express();
var bodyParser = require("body-parser");
var server     = require('http').createServer(app);
var io         = require("socket.io")(server);
var socket     = io.sockets;
var port       = 8081;
var path       = require('path');
var dirName    = path.dirname(require.main.filename);
var baseUrl    = "http://localhost:8081";
var multer     = require("multer");
var crypto     = require('crypto');
var cAlgorithm  = 'aes-256-ctr';
var cPassword   = 'd6F3Efeq';

// store for file uploads
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dirName + '/webroot/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// upload
var upload     = multer({ storage : storage});

// session middleware
var middleWare = session({
	cookieName : 'session',
  secret: 'karenkate',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  resave: true,
  saveUninitialized: true
});

// set app engines
app.set('views',  dirName + '/app/view');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/webroot', express.static( dirName + '/webroot'));
app.use(middleWare);

// allow io to use session
io.use(function(socket, next) {
    middleWare(socket.request, socket.request.res, next);
});

// listen to port 8081
server.listen(port);

// export objects
exports.express     = express;
exports.app         = app;
exports.server      = server;
exports.io          = io;
exports.socket      = socket;
exports.baseUrl     = baseUrl;
exports.session     = session;
exports.model       = require(dirName + "/app/model/CommonModel.js");
exports.util        = require(dirName + "/app/lib/util.js");
exports.registry    = require(dirName + "/app/model/scheme.js");
exports.activeUsers = [];
exports.upload      = upload;
exports.multer      = multer;
exports.crypto      = require('crypto');
exports.cAlgorithm  = 'aes-256-ctr';
exports.cPassword   = 'd6F3Efeq';
exports.data = {
  scripts : [
    "https://code.jquery.com/jquery-2.1.4.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",
    "http://momentjs.com/downloads/moment.min.js",
    baseUrl + "/socket.io/socket.io.js",
    baseUrl + "/webroot/js/socket.js"
  ],
  styles : [
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
  ],
  pageTitle : "FDC Social Network",
  isLoggedIn : false,
  selectedMenu : 'nf',
  baseUrl : baseUrl,
  panelTitle : false
};