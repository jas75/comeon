// Make a socket.io connection
var socket = io();
 
// Assign variables to query the DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

var connection = new RTCMultiConnection();

//connection.socketUrl = "http://localhost:3000";
//connection.socketUrl = socket.io.uri;
 connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
connection.session = {
    audio: true,
    video: true
};
connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};


document.getElementById('btn-open-or-join-room').onclick = function() {
    this.disabled = true;

    connection.openOrJoin('predefiend-roomid')

}
