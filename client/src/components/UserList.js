// UserList.js
import React from 'react';
import { useSelector } from 'react-redux';

const UserList = () => {
	const users = useSelector((state) => state.user.users);

	const getStatusColor = (status) => {
		switch (status) {
			case 'online':
				return 'green';
			case 'afk':
				return 'orange';
			case 'disconnect':
				return 'grey';
			default:
				return 'black';
		}
	};

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>
					<span
						style={{
							width: '10px',
							height: '10px',
							borderRadius: '50%',
							backgroundColor: getStatusColor(user.status),
							display: 'inline-block',
							marginRight: '5px',
						}}
					/>
					{user.name} - {user.status}
				</li>
			))}
		</ul>
	);
};

export default UserList;
