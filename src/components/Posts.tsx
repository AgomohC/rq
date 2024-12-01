import { usePosts } from "../hooks/use-posts"
import { Post } from "../types/post.types"
export const Posts = () => {
	const { data, status } = usePosts()
	if (status === "pending") {
		return "Loading..."
	}
	if (status === "error") {
		return "Error"
	}

	return (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
			{data.map(datum => (
				<SinglePost
					key={datum.id}
					post={datum}
				/>
			))}
		</div>
	)
}
export const SinglePost = (props: { post: Post }) => {
	const { id, userId, title, body } = props.post
	return (
		<>
			<h3>#{id}</h3>
			<h4>{title}</h4>
			<p>{body}</p>

			<footer>
				<sub>Created by {userId}</sub>
			</footer>
		</>
	)
}
