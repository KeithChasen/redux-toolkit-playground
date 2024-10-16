import { AppDispatch } from '../store';
import axios from 'axios';
import { IUser } from '../../models/IUser';
import { userSlice } from './UserSlice';

export const fetchUsers = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(userSlice.actions.usersFetching());
		const response = await axios.get<IUser[]>(
			'https://jsonplaceholder.typicode.com/users'
		);
		dispatch(userSlice.actions.usersFetchingSuccess(response.data));
	} catch (e: unknown) {
		dispatch(
			userSlice.actions.usersFetchingError(
				e instanceof Error ? e.message : String(e)
			)
		);
	}
};
