// declare init
var path    = require('path');
var dirName = path.dirname(require.main.filename);
var init    = require(dirName + "/app/config/init.js");
var socket  =  {};
var qs      = require('querystring');
var model   = require(dirName + "/app/model/CommonModel.js");

// setup connection
init.io.on('connection', function(socket){
	// on login user is called
	socket.on('loginUser', function(data, callback){
		// login data
		var loginData = qs.parse(data);

		// create user
		model.users.loginUser(loginData)
		.then(function(user){
			var checker = {error : false};
			if (user.length !== 0) {
				checker.error = false;
				model.users.pushLoginUser(user);
			} else {
				checker.error = true;
			}
			callback(checker);
		})
		.catch(function(error){
			callback({error:true, content:error});
		});
	});
	// on login user is called
	socket.on('registerUser', function(data, callback){
		// register data
		var registerData = qs.parse(data);
		registerData.name = registerData.fname;

		// login user
		model.users.createUser(registerData)
		.then(function(user){
			callback({error:false, content:user});
		})
		.catch(function(error){
			callback({error:true, content:error});
		});
	});
});