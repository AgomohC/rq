import { useQuery } from "@tanstack/react-query"
import { GET_ALL_POSTS_QUERY_KEY, getAllPosts } from "../api/posts.api"
import { safeArray } from "../utils/utils"
import { Post } from "../types/post.types"

export const usePosts = () => {
	return useQuery({
		// This query key is used to invalid cache
		queryKey: GET_ALL_POSTS_QUERY_KEY(),
		queryFn: getAllPosts,
		// Performs Transformations on your data

		select: data => {
			return safeArray<Post>(data).map(datum => ({
				...datum,
			}))
		},
	})
}
