"use strict"
var socket = false;
$(document).ready(function(){
	// socket io
	socket = socketio.connect();

	// when login user is clicked
	$('.chat-login-user')
	.off('click')
	.on('click', function(){
		var login = $('#user-login-form').serialize();
		$.post(
			'/user/signin',
			login, 
			function(data){
				if (data.error == false) { window.location.href = "/page/home"; } 
				else { 
					bootbox.alert("Username and password does not exist"); 
				}
			}
		);
	});

	// when the register user is clicked
	$('.chat-register-user')
	.off('click')
	.on('click', function(){
		var register = $('#user-register-form').serialize();
		$.post(
			'/user/register',
			register, 
			function(data){
				console.log(data);
				if (data.error == false) { 
					bootbox.alert("content");
				}
				else {
					bootbox.alert(data.content.message);
				}
			}
		);
	});
	
});