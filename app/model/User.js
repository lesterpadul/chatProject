var scheme   = require("./scheme.js");
var session  = require("client-sessions");

module.exports = {
	createUser : function (userData) {
		return scheme
		.users
		.create({
			name : userData.name,
	    email : userData.email,
	    password : userData.password,
	    status : 1
		});
	},
	loginUser : function(userData){
		return scheme
		.users
		.findOne({
			where : {
				email : userData.email,
	    	password : userData.password
			}
		});
	},
	pushLoginUser : function(userData){
		session.user_id = userData.id;
	},
	getUser : function(userId){
		return scheme
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