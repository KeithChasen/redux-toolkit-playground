import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { logout } from '../store/reducers/AuthSlice';

const baseUrl = 'http://localhost:5001'; // but should be import.meta.env.VITE_SERVER_ENDPOINT

const baseQuery = fetchBaseQuery({
	baseUrl,
});

const customFetchBase: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error?.status === 401) {
		try {
			const refreshToken = await baseQuery(
				{
					credentials: 'include',
					url: 'auth/refresh',
				},
				api,
				extraOptions
			);

			if (refreshToken.data) {
				//retry initial query
				result = await baseQuery(args, api, extraOptions);
			} else {
				api.dispatch(logout());
				window.location.href = '/login';
			}
		} catch (e) {}
	}

	return result;
};

export default customFetchBase;
