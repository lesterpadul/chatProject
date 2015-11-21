// declare init
var path       = require('path');
var dirName    = path.dirname(require.main.filename);
var init = require(dirName + "/app/config/init.js");

// setup connection
init.io.on('connection', function(sock){
});