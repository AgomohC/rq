import {
	getSinglePosts,
	GET_SINGLE_POST_QUERY_KEY,
} from "../api/single-post.api"
import { useQuery } from "@tanstack/react-query"

export const useSinglePost = () => {
	// ! get the post id you're trying to view with react router query param or whatever state manager you're using. I recommend Zustand

	/**
	 * TODO: create a single post paste which the user can navigate on click on any post on the gallery. Then modify this hook to retrieve the post id from the browser path param and pass into the relevant fns
	 */
	return useQuery({
		queryKey: GET_SINGLE_POST_QUERY_KEY(0),
		queryFn: () => getSinglePosts(0),
	})
}
