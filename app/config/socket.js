// declare init
var path    = require('path');
var dirName = path.dirname(require.main.filename);
var init    = require(dirName + "/app/config/init.js");
var socket  = {};
var qs      = require('querystring');
var model   = require(dirName + "/app/model/CommonModel.js");

// setup connection
init.io.on('connection', function(socket){
	var SESSION = socket.request.session;
	socket.on("userReady", function(cb){
		var activeUsers = init.util.pushToArray(init.activeUsers, [SESSION.user_id]);
		init.util.activeUsers = activeUsers;
		socket.emit("callGlobalChat");
	});

	socket.on("sendGlobalMessage", function(data, cb){
		// get global message template
		var message = init.util.globalMessageForm();

		// find the user information
		init.registry.users
		.findOne({
			where : {
				id : SESSION.user_id
			}
		})
		.then(function(user){
			message.msg = data.msg;
			message.user = user;
			init.io.sockets.emit("receiveGlobalChat", message);
			socket.emit("sendActiveUsers", {user: init.activeUsers});
			cb();
		});
	});
});