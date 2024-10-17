import { FC, MouseEvent } from 'react';
import { IPost } from '../models/IPost';

interface PostItemProps {
	post: IPost;
	remove: (id: number) => void; // this should be provided by parent component to delete the post. In this example, we are assuming it's passed as a prop.
	update: (post: IPost) => void; // this should be provided by parent component to update the post. In this example, we are assuming it's passed as a prop
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
	const handleRemove = (e: MouseEvent) => {
		e.stopPropagation();
		remove(post.id);
	};

	const handleUpdate = (e: MouseEvent) => {
		e.stopPropagation();

		const title = prompt();
		update({
			...post,
			title: title ?? post.title,
		});
	};

	return (
		<div onClick={handleUpdate}>
			{post.id} {post.title} <button onClick={handleRemove}>Delete</button>
		</div>
	);
};
export default PostItem;
