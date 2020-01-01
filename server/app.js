const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

var position = {
	x: 200,
	y: 200
};

Socketio.on("connection", socket => {
	socket.emit("position", position) // this changes position for the connected client only. so use "socket"
	socket.on("move", data => {
		switch (data) {
			case 'left':
				position.x -= 5
				Socketio.emit("position", position) // this changes position for all connected clients. so use "Socketio"
				break;
			case 'right':
				position.x += 5
				Socketio.emit("position", position) // this changes position for all connected clients. so use "Socketio"
				break;
			case 'up':
				position.y -= 5
				Socketio.emit("position", position) // this changes position for all connected clients. so use "Socketio"
				break;
			case 'down':
				position.y += 5
				Socketio.emit("position", position) // this changes position for all connected clients. so use "Socketio"
				break;
		
			default:
				break;
		}
	})
});


Http.listen(3000, ()=> {
	console.log("Listening at: 3000 ...");
});