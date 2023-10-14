// utils.js
export const generateFakeUserData = () => {
	const userId = Math.floor(Math.random() * 1000);
	const statuses = ['online', 'afk', 'disconnect'];
	const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

	return {
		id: userId,
		name: `User ${userId}`,
		status: 'connected',
	};
};
