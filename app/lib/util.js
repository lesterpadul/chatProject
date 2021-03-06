var path    = require('path');
var dirName = path.dirname(require.main.filename);
var init    = require(dirName + "/app/config/init.js");
var _ = require('underscore');

module.exports = {
	isUserLoggedin : function(session){
		if (typeof session.user_id == 'undefined') {
			return false;
		}
		return true;
	},
	validMenus : function () {
		return ["home", "profile", "messages", "contacts"];
	},
	pushToArray : function(array, needle){
		if (needle.length == 0) {
			return array;
		}
		for (var i = 0; i < needle.length; i++) {
			if (_.lastIndexOf(array, needle[i]) < 0) {
				array.push(needle[i]);
			}
		}
		return array;
	},
	globalMessageForm : function (){
		return {msg : "", user : {}, timestamp: (new Date()).getTime()};
	},
	encryptString : function (text) {
	  var cipher = init.crypto.createCipher(init.cAlgorithm,init.cPassword);
	  var crypted = cipher.update(text,'utf8','hex')
	  crypted += cipher.final('hex');
	  return crypted;
	}
};