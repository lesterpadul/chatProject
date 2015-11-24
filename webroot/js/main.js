"use strict"
var socket = null;
$(document).ready(function(){
	// socket io
	socket = socketio.connect();

	// handle on emits
	onEmits();

	// call this to inform nodejs that the user was loaded
	socket.emit("userReady", function(){
		$('.chat-text-group .chat-blabber-spinner').show();
		$('.chat-text-group .chat-blabber, .active-user-counter').hide();
	});

	// on send blab
	$(document)
  .off('click', '.chat-text-group .blab-send')
  .on('click', '.chat-text-group .blab-send', function(){
    var txt = $.trim($("#chat-textarea-blab").val());
    // if text length is 0
    if (txt.length == 0) {
    	return false;
    }
    // send global message
    socket.emit("sendGlobalMessage", {msg:txt}, function(){
    	$("#chat-textarea-blab").val('');
    });
  });
});

// call global chatter
function onEmits () {
	var mainContainer = $('.chat-text-group');
	var chatContainer = mainContainer.find('.chat-blabber');

	// call global chat
	socket.on("callGlobalChat", function(){
		$('.chat-text-group .chat-blabber-spinner').hide();
		$('.chat-text-group .chat-blabber').show();
	});

	// receive global chatter
	socket.on("receiveGlobalChat", function(data){
		// clone master message
		var clone = chatContainer.find('.master-global:eq(0)').clone();
		clone.find('.chatter-image');
		clone.find('.chatter-time').html(data.timestamp);
		clone.find('.chatter-name').html(data.user.name);
		clone.find('.chatter-content').html(data.msg);
		clone.show();
		chatContainer.append(clone);
	});

	// send active users
	socket.on("sendActiveUsers", function(data){
		mainContainer.find('.active-user-counter').html(data.length).show();
	});
}