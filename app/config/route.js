// declare init
var path    = require('path');
var dirName = path.dirname(require.main.filename);
var init    = require(dirName + "/app/config/init.js");
var _       = require('underscore');
var model   = require(dirName + "/app/model/CommonModel.js");

/*set styles and scripts*/
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
		"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
	],
	pageTitle : "FDC Social Network",
	isLoggedIn : false,
	selectedMenu : 'nf'
};

/*****************/
/***** GET *******/
/*****************/
/*get index*/
init.app.get('/', function (req, res) {
	// set content page
	data.content = "landing/login.html";
	data.isLoggedIn = init.util.isUserLoggedin(req.session);

	if (data.isLoggedIn) {
		res.redirect('/home');
	}

	// set js script of page
	if (_.lastIndexOf(data.scripts, init.baseUrl + "/webroot/js/landing_script.js") < 0) {
		data.scripts.push(init.baseUrl + "/webroot/js/landing_script.js");
	}
	// set style of page
	if (_.lastIndexOf(data.styles, init.baseUrl + "/webroot/css/landing_css.css") < 0) {
		data.styles.push(init.baseUrl + "/webroot/css/landing_css.css");
	}
	// render view
	res.render("index.html", data);
});

/*get index*/
init.app.get('/page/:page', function (req, res) {
	data.content = req.params.page + "/index.html";
	data.isLoggedIn = init.util.isUserLoggedin(req.session);
	data.selectedMenu = req.params.page;

	res.render("index.html", data);
});

/*get home index*/
init.app.get('/signout', function (req, res) {
	delete req.session.user_id;
	res.redirect('/');
});

/*catch 404!*/
init.app.get('*', function (req, res) {
	// set 404 page
	data.content = "errors/error_page_not_found.html";
	res.render("index.html", data);
});


/*****************/
/***** POST ******/
/*****************/
/*login*/
init.app.post('/user/signin', function(req, res){
	// login data
	var loginData = req.body;
	// create user
	model.users.loginUser(loginData)
	.then(function(user){
		var checker = {error : false};
		if (user.length !== 0) {
			checker.error = false;
			req.session.user_id = user.id;
		} else {
			checker.error = true;
		}
		res.json(checker);
	})
	.catch(function(error){
		res.json(error);
	});
});

/*register*/
init.app.post('/user/register', function(req, res){
	// register data
	var registerData = data;
	registerData.name = registerData.fname;
	// login user
	model.users.createUser(registerData)
	.then(function(user){
		res.json({error:false, content:user});
	})
	.catch(function(error){
		res.json({error:true, content:error});
	});
});