// declare init
var path    = require('path');
var dirName = path.dirname(require.main.filename);
var init    = require(dirName + "/app/config/init.js");

module.exports = {
	createUser : function (userData) {
		return init.registry
		.users
		.create({
			name : userData.name,
	    email : userData.email,
	    password : init.util.encryptString(userData.password),
	    status : 1
		});
	},
	updateUser : function (userData) {
		return init.registry
		.users
		.update(userData,{
			where : {
				id : userData.id
			}
		});
	},
	loginUser : function(userData){
		return init.registry
		.users
		.findOne({
			where : {
				email : userData.email,
	    	password : init.util.encryptString(userData.password)
			}
		});
	},
	getUser : function(userId){
		return init.registry
		.users
		.findOne({
			where : {
				id : userId,
			}
		});
	},
	isLoggedin : function(session){
		if (typeof session.user_id == 'undefined') {
			return false;
		}
		return true;
	}
};