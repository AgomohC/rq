import React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { GET_ALL_POSTS_QUERY_KEY } from "../api/posts.api"

export const RefetchBtn = () => {
	const queryClient = useQueryClient()

	return (
		<button
			onClick={() => {
				/**
				 * !the best thing about query invalidation is that it does not trigger the loading state. So it's best to use it when you want to update the data without showing the loading state especially after mutations. If you want to refetch and show a loading state, useQuery hook returns a refetch function that triggers that.
				 */
				queryClient.invalidateQueries({
					queryKey: GET_ALL_POSTS_QUERY_KEY(),
				})
			}}
		>
			Refetch Posts
		</button>
	)
}
