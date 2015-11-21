// declare init
var path       = require('path');
var dirName    = path.dirname(require.main.filename);

// export individual models
exports.model = {
	users : require(dirName + "/app/model/User.js"),
	photos : require(dirName + "/app/model/Photo.js")
};