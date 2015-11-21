// declare init
var path       = require('path');
var dirName    = path.dirname(require.main.filename);

// export individual models
module.exports = {
	users : require(dirName + "/app/model/user.js")
};