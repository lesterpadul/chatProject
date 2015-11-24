// declare init
var path    = require('path');
var dirName = path.dirname(require.main.filename);
var init    = require(dirName + "/app/config/init.js");
var socket  = {};
var qs      = require('querystring');
var model   = require(dirName + "/app/model/CommonModel.js");

// setup connection
init.io.on('connection', function(socket){
});