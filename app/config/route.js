// declare init
var path    = require('path');
var dirName = path.dirname(require.main.filename);
var init    = require(dirName + "/app/config/init.js");
var _       = require('underscore');

// set styles and scripts
var data = {
	scripts : [
		"https://code.jquery.com/jquery-2.1.4.min.js",
		"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",
		"http://momentjs.com/downloads/moment.min.js",
		init.baseUrl + "/socket.io/socket.io.js",
		init.baseUrl + "/webroot/js/socket.js"
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
	if (_.lastIndexOf(data.scripts, init.baseUrl + "/webroot/js/landing_script.js") < 0) {
		data.scripts.push(init.baseUrl + "/webroot/js/landing_script.js");
	}
	res.render("index.html", data);
});

// get index
init.app.get('/home', function (req, res) {
	data.content = "home/index.html";
	data.selectedHomeMenu = 'newsfeed';
	res.render("index.html", data);
});

// get home index
init.app.get('/home/:page', function (req, res) {
	data.content = "home/"+req.params.page+".html";
	data.selectedHomeMenu = req.params.page;
	res.render("index.html", data);
});

// get home index
init.app.get('/home/profile/:id', function (req, res) {
	data.content = "home/profile.html";
	data.user_id = req.params.page;
	res.render("index.html", data);
});

// get home index
init.app.get('/signout', function (req, res) {
	res.redirect('/');
});

// catch 404!
init.app.get('*', function (req, res) {
	data.content = "errors/error_page_not_found.html";
	res.render("index.html", data);
});