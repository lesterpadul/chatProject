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
	init.data.content = "landing/login.html";
	init.data.isLoggedIn = init.util.isUserLoggedin(req.session);

	// check if logged in
	if (init.data.isLoggedIn) {
		res.redirect('/home');
	}

	// push to scripts
	data.scripts = init.util.pushToArray(init.data.scripts, [init.baseUrl + "/webroot/js/landing_script.js"]);
	data.styles = init.util.pushToArray(init.data.styles, [init.baseUrl + "/webroot/css/landing_css.css"]);

	// render view
	res.render("index.html", init.data);
});

/*get index*/
init.app.get('/page/:page', function (req, res) {
	init.data.content      = req.params.page + "/index.html";
	init.data.isLoggedIn   = init.util.isUserLoggedin(req.session);
	init.data.selectedMenu = req.params.page;
	init.data.validMenus   = init.util.validMenus();

	// update js
	init.data.scripts = init.util.pushToArray(init.data.scripts, [init.baseUrl + "/webroot/js/main.js"]);

	// check if valid page
	if (_.lastIndexOf(init.data.validMenus, init.data.selectedMenu) < 0) {
		res.redirect("/404");
	}
	if (init.data.selectedMenu == "profile") {
		console.log(init.data);
		init.registry.users
		.findOne({
			where : {
				id : req.session.user_id
			}
		})
		.then(function(user){
			init.data.panelTitle = user.name;
			init.data.user = user;
			res.render("index.html", init.data);
		});
	} else {
		init.data.panelTitle = false;
		// render index
		res.render("index.html", init.data);
	}
});

/*get home index*/
init.app.get('/signout', function (req, res) {
	delete req.session.user_id;
	res.redirect('/');
});

/*catch 404!*/
init.app.get('*', function (req, res) {
	// set 404 page
	init.data.content = "errors/error_page_not_found.html";
	res.render("index.html", init.data);
});


/*****************/
/***** POST ******/
/*****************/
/**
 * [description]
 * @param  {[type]} req         [description]
 * @param  {[type]} res){		var loginData     [description]
 * @return {[type]}             [description]
 */
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

/**
 * [description]
 * @param  {[type]} req         [description]
 * @param  {[type]} res){		var registerData  [description]
 * @return {[type]}             [description]
 */
init.app.post('/user/register', function(req, res){
	// register data
	var registerData = req.body;
	registerData.name = registerData.fname;
	delete registerData.fname;

	// register user
	model.users.createUser(registerData)
	.then(function(user){
		res.json({error:false, content:user});
	})
	.catch(function(error){
		res.json({error:true, content:error});
	});
});

/**
 * [description]
 * @param  {[type]} req      [description]
 * @param  {[type]} res){} [description]
 * @return {[type]}          [description]
 */
init.app.post('/user/profile/update', init.upload.single('profile_image'), function(req, res){
	var userData = {};
	userData.name  = req.body.profile_name;
	userData.email = req.body.profile_email;
	userData.id    = req.body.profile_id;
	userData.description = req.body.profile_about_me;
	
	// check if image exists
	if (typeof req.file != 'undefined') {
		userData.image = req.file.originalname;
	}

	// update user
	model.users.updateUser(userData)
	.then(function(user){
		res.redirect('/page/profile');
	})
	.catch(function(error){
		res.redirect('page/profile?update=false');
	});
})