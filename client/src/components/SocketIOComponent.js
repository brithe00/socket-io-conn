import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStatus } from '../redux/userSlice';
import io from 'socket.io-client';
import UserList from './UserList';

const socket = io('http://localhost:8000');

const SocketIOComponent = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Connection opened
		socket.on('connect', () => {
			console.log('Connected to Socket.IO server');
		});

		// Listen for messages
		socket.on('message', (message) => {
			console.log(`Received message: ${message}`);
		});

		// Listen for custom events
		socket.on('customEvent', (data) => {
			console.log(`Received custom event: ${data}`);
		});

		// Listen for user status updates
		socket.on('updateUserStatus', (data) => {
			// Update user status in Redux store
			dispatch(updateUserStatus(data.userId, data.status));
		});

		// Connection closed
		socket.on('disconnect', () => {
			console.log('Disconnected from Socket.IO server');
		});

		// Clean up the Socket.IO connection on component unmount
		return () => {
			socket.disconnect();
		};
	}, [dispatch]);

	return (
		<>
			<div>Socket.IO Component</div>
		</>
	);
};

export default SocketIOComponent;
