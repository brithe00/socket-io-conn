import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SocketIOComponent from './components/SocketIOComponent';
import userReducer from './redux/userSlice';
import NewUser from './components/NewUser';
import UserList from './components/UserList';

const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

const App = () => {
	return (
		<Provider store={store}>
			<SocketIOComponent />
			<NewUser />
			<UserList />
			{/* Your main application components go here */}
		</Provider>
	);
};

export default App;
