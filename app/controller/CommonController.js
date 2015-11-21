// declare init
var path       = require('path');
var dirName    = path.dirname(require.main.filename);

// export individual models
exports.model = {
	userRegistration : require(dirName + "/app/controller/UserRegistrationController.js")
};