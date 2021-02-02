//Make connection
const socket = io.connect("http://192.168.1.69:4000");

// Query DOM
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');


// Emit events
btn.addEventListener('click', function() {
  socket.emit('chat', {
    handle: handle.value,
    message: message.value
  });
  message.value = "";
});

// Listen for events
socket.on('chat', function(data) {
    console.log(data);
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('start', function(message) {
    console.log(message);
});