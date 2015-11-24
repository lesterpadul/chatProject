module.exports = {
	isUserLoggedin : function(session){
		if (typeof session.user_id == 'undefined') {
			return false;
		}
		return true;
	},
	validMenus : function () {
		return ["home", "profile", "messages", "contacts"];
	}
};