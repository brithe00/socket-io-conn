// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	users: [
		{ id: 1, name: 'User-1', status: 'connected' },
		{ id: 2, name: 'User-2', status: 'connected' },
	],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUserStatus: (state, action) => {
			const { userId, status } = action.payload;
			state.users = state.users.map((user) =>
				user.id === userId ? { ...user, status } : user
			);
		},
	},
});

export const { updateUserStatus } = userSlice.actions;
export default userSlice.reducer;
