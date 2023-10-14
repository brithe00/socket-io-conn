// UserComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatus } from '../redux/userSlice';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const UserComponent = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.user.users);

	useEffect(() => {
		// Listen for updateUserStatus events from the server
		socket.on('updateUserStatus', (data) => {
			// Dispatch action to update the user's status in Redux
			dispatch(updateUserStatus(data));
		});

		// Cleanup the event listener on component unmount
		return () => {
			socket.off('updateUserStatus');
		};
	}, [dispatch]);

	const handleStatusChange = (userId, newStatus) => {
		// Dispatch action to update the user's status in Redux
		dispatch(updateUserStatus({ userId, status: newStatus }));

		// Emit the updateUserStatus event to the server
		socket.emit('updateUserStatus', { userId, status: newStatus });
	};

	return (
		<div>
			<h1>User Status 1: {users[0].status}</h1>
			<div>
				<button onClick={() => handleStatusChange(users[0].id, 'connected')}>
					Connect
				</button>
				<button onClick={() => handleStatusChange(users[0].id, 'afk')}>
					AFK
				</button>
				<button onClick={() => handleStatusChange(users[0].id, 'disconnect')}>
					Disconnect
				</button>
			</div>

			<h1>User Status 2: {users[1].status}</h1>
			<div>
				<button onClick={() => handleStatusChange(users[1].id, 'connected')}>
					Connect
				</button>
				<button onClick={() => handleStatusChange(users[1].id, 'afk')}>
					AFK
				</button>
				<button onClick={() => handleStatusChange(users[1].id, 'disconnect')}>
					Disconnect
				</button>
			</div>
		</div>
	);
};

export default UserComponent;
