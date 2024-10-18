import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { GenericResponse } from './types';

export const authApi = createApi({
	reducerPath: 'authAPI',
	baseQuery: customFetchBase,
	endpoints: builder => ({
		registerUser: builder.mutation<
			GenericResponse,
			{ email: string; password: string }
		>({
			query: ({ email, password }) => ({
				url: '/auth/register',
				method: 'POST',
				body: JSON.stringify({ email, password }),
			}),
		}),
		login: builder.mutation<
			GenericResponse,
			{ email: string; password: string }
		>({
			query: ({ email, password }) => ({
				url: '/auth/login',
				method: 'POST',
				body: JSON.stringify({ email, password }),
			}),
		}),
	}),
});
