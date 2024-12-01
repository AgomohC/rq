import { dataFetcher } from "../config/axios.config"
import { Post } from "../types/post.types"

export const getSinglePosts = (postId: number | string) => {
	return dataFetcher<
		Post,
		undefined,
		undefined,
		undefined,
		{ postId: string }
	>({
		method: "get",
		url: "/posts",
		pathParams: {
			postId: postId.toString(),
		},
	})
}
export const GET_SINGLE_POST_QUERY_KEY = (postId: number | string) => {
	return ["posts", postId]
}
