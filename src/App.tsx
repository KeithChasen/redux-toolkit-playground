import { useEffect } from 'react';
import './App.css';
import PostContainer from './components/PostContainer';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/ActionCreators';

function App() {
	// const dispatch = useAppDispatch();
	// // using typed selector so ts would suggest state fields
	// const { users, isLoading, error } = useAppSelector(
	// 	state => state.userReducer
	// );

	// useEffect(() => {
	// 	dispatch(fetchUsers());
	// }, []);

	return (
		<div className='App'>
			{/* {isLoading && 'Loading...'}
			{error && error}
			{users.length && JSON.stringify(users, null, 2)} */}
			<PostContainer />
		</div>
	);
}

export default App;
