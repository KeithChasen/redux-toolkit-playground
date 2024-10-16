import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { userSlice } from './store/reducers/UserSlice';

function App() {
	// using typed selector so ts would suggest state fields
	const { count } = useAppSelector(state => state.userReducer);
	const { increment } = userSlice.actions;
	const dispatch = useAppDispatch();

	return (
		<div className='App'>
			<h1>{count}</h1>
			<button onClick={() => dispatch(increment(5))}>increment</button>
		</div>
	);
}

export default App;
