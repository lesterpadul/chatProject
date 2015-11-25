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

		// set belongs to
		init.registry.chat_histories.belongsTo(init.registry.users, {foreignKey : "user_id", required : true});

		// include model
		init.registry.chat_histories
		.findAll({
			where : {
				message_type : 0 
			},
			include : [
				{
					model : init.registry.users,
				}
			],
			order : "chat_histories.id DESC",
			limit : 10
		})
		.then(function(chat){
			var chatters = [];
			if (chat.length !== 0) {
				for (var i = chat.length - 1; i >= 0; i--) {
					var messageTemplate = init.util.globalMessageForm();
					messageTemplate.msg = chat[i].message;
					messageTemplate.user = chat[i].user;
					messageTemplate.image = "";
					messageTemplate.image = init.baseUrl + "/webroot/uploads/" + chat[i].user.image;
					messageTemplate.timestamp = chat[i].created;
					chatters.push(messageTemplate);
				}
			}
			socket.emit("callGlobalChat", chatters);
		})
		.catch(function(err){});
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
			init.registry.chat_histories
			.create({
				user_id : SESSION.user_id,
		    recipient_id : 0,
		    message : data.msg,
		    message_type : 0,
		    created : init.moment().format("YYYY-MM-DD HH:mm:ss"),
			  modified : init.moment().format("YYYY-MM-DD HH:mm:ss")
			})
			.then(function(){
				message.msg = data.msg;
				message.user = user;
				message.image = init.baseUrl + "/webroot/uploads/" + user.image;
				message.timestamp = init.moment().format("YYYY-MM-DD HH:mm:ss");
				init.io.sockets.emit("receiveGlobalChat", message);
				cb();
			});
		});
	});
});