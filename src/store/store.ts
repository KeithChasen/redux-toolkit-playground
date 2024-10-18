import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postAPI } from '../services/PostService';
import userReducer from './reducers/UserSlice';
import authReducer from './reducers/AuthSlice';
import { authApi } from '../services/AuthService';

const rootReducer = combineReducers({
	userReducer,
	[postAPI.reducerPath]: postAPI.reducer,
	authReducer,
	[authApi.reducerPath]: authApi.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware()
				.concat(postAPI.middleware)
				.concat(authApi.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
