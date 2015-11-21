// declare init
var path       = require('path');
var dirName    = path.dirname(require.main.filename);
var init = require(dirName + "/app/config/init.js");
var controllers = require(dirName + "/app/controller/CommonController.js");

// set styles and scripts
var data = {
	scripts : [
		"https://code.jquery.com/jquery-2.1.4.min.js",
		"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",
		"http://momentjs.com/downloads/moment.min.js",
		"http://localhost:8081/socket.io/socket.io.js"
	],
	styles : [
		"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
		"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css",
		"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
	],
	pageTitle : "FDC Social Network",
	showHeader : true
};

// get index
init.app.get('/', function (req, res) {
	data.content = "landing/login.html";
	data.showHeader = false;
	res.render("index.html", data);
});

// catch 404!
init.app.get('*', function (req, res) {
	data.content = "errors/error_page_not_found.html";
	res.render("index.html", data);
});