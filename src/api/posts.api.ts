import { dataFetcher } from "../config/axios.config"
import { Post } from "../types/post.types"

export const getAllPosts = () => {
	return dataFetcher<Post[], undefined, undefined, undefined, undefined>({
		method: "get",
		url: "/posts",
	})
}
export const GET_ALL_POSTS_QUERY_KEY = () => {
	return ["posts"]
}
