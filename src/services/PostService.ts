import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../models/IPost';
export const postAPI = createApi({
	reducerPath: 'postAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5001',
	}),
	tagTypes: ['Post'], // tags for this API
	endpoints: builder => ({
		fetchAllPosts: builder.query<IPost[], number>({
			query: (limit: number = 5) => ({
				url: '/posts',
				// credentials: 'include', !for authorisation
				params: {
					_limit: limit,
				},
			}),
			providesTags: result => ['Post'], // automatically tag newly fetched posts
		}),
		createPost: builder.mutation<IPost, IPost>({
			query: (post: IPost) => ({
				url: '/posts',
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['Post'], // automatically invalidate posts when a new one is created
		}),
		updatePost: builder.mutation<IPost, IPost>({
			query: (post: IPost) => ({
				url: `/posts/${post.id}`,
				method: 'PUT',
				body: post,
			}),
			invalidatesTags: ['Post'], // automatically invalidate posts when an existing one is updated
		}),
		deletePost: builder.mutation<void, number>({
			query: (id: number) => ({
				url: `/posts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Post'], // automatically invalidate posts when a deleted one is found
		}),
	}),
});
