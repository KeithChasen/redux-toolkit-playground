import { createSlice } from '@reduxjs/toolkit';

type AuthState = { token: string | null; user: string | null };

const initialState: AuthState = {
	token: null,
	user: null,
};
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { user, token } = action.payload;
			state.token = token;
			state.user = user;
		},
		logout: state => {
			state.token = null;
			state.user = null;
		},
	},
});

export default authSlice.reducer;
export const { logout, setUser } = authSlice.actions;
