import { useState } from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';

const PostContainer = () => {
	const [limit, setLimit] = useState(20);
	//useFetchAllPostsQuery - auto generated method based on endpoints we added
	const {
		data: posts,
		isLoading,
		error,
	} = postAPI.useFetchAllPostsQuery(
		limit
		// , { pollingInterval: 1000 } - hit api every second for fresh data
	);

	const [createPost, { error: postError, isLoading: postLoading }] =
		postAPI.useCreatePostMutation();

	const [updatePost, {}] = postAPI.useUpdatePostMutation();

	const [deletePost, {}] = postAPI.useDeletePostMutation();

	const handleCreatePost = async () => {
		const title = prompt();
		if (title?.length) {
			// explicitly add as IPost because server generates id automatically
			await createPost({ title, body: title } as IPost);
		}
	};

	const handleRemove = (id: number) => {
		deletePost(id);
	};

	const handleUpdate = (post: IPost) => {
		updatePost(post);
	};

	return (
		<div>
			<button onClick={handleCreatePost}>Create</button>
			<label htmlFor='limit'>Limit</label>
			<input
				id='limit'
				type='number'
				value={limit}
				onChange={e =>
					setLimit(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0)
				}
			/>
			{isLoading && 'Loading...'}
			{error && 'Error'}
			{posts &&
				posts?.map(post => (
					<PostItem
						key={post.id}
						post={post}
						remove={handleRemove}
						update={handleUpdate}
					/>
				))}
		</div>
	);
};

export default PostContainer;
