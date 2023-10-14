import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
	console.log('Client connected');

	// Example: Send a message to the client
	socket.emit('message', 'Welcome to the Socket.IO server');

	// Handle custom events
	socket.on('updateUserStatus', (data) => {
		console.log(`Received updateUserStatus event: ${JSON.stringify(data)}`);

		// Update user status in the database or perform other actions as needed
		// For simplicity, we'll just broadcast the status change to all clients
		io.emit('updateUserStatus', data);
	});

	// Handle disconnection
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
