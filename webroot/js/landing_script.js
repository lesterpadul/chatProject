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
		socket.emit('loginUser', login, function(data){
		});
	});

	// when the register user is clicked
	$('.chat-register-user')
	.off('click')
	.on('click', function(){
		var register = $('#user-register-form').serialize();
		socket.emit('registerUser', register, function(data){
			console.log(data);
		});
	})
});