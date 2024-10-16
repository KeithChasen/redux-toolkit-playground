import { useState } from 'react';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';

const PostContainer = () => {
	const [limit, setLimit] = useState(5);
	//useFetchAllPostsQuery - auto generated method based on endpoints we added
	const {
		data: posts,
		isLoading,
		error,
	} = postAPI.useFetchAllPostsQuery(
		limit
		// , { pollingInterval: 1000 } - hit api every second for fresh data
	);
	return (
		<div>
			<input
				type='number'
				onChange={e =>
					setLimit(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0)
				}
			/>
			{isLoading && 'Loading...'}
			{error && 'Error'}
			{posts && posts?.map(post => <PostItem key={post.id} post={post} />)}
		</div>
	);
};

export default PostContainer;
