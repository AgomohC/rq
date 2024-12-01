import axios, { AxiosError, AxiosRequestConfig } from "axios"

const api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" })

export type DataFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
	url: string
	method: AxiosRequestConfig["method"]
	body?: TBody
	headers?: THeaders
	queryParams?: TQueryParams
	pathParams?: TPathParams
	signal?: AbortSignal
}
export async function dataFetcher<
	TData,
	TBody extends Record<string, unknown> | FormData | undefined | null,
	THeaders extends Record<string, unknown> | undefined,
	TQueryParams extends Record<string, string> | undefined,
	TPathParams extends Record<string, string> | undefined
>(
	param: DataFetcherOptions<TBody, THeaders, TQueryParams, TPathParams>
): Promise<TData> {
	const { url, method, body, headers, pathParams, queryParams, signal } = param

	const requestHeaders: HeadersInit = {
		Accept: "application/json",
		"Content-Type": "application/json",
		...headers,
	}

	const authorizationHeadIsPresent = "Authorization" in requestHeaders

	if (!authorizationHeadIsPresent) {
		// Check if the user is logged in and attach relevant auth headers if needed
		requestHeaders["Authorization"] =
			"Bearer Token or whichever token format you use"
	}

	try {
		const response = await api({
			url: resolveUrl(url, queryParams, pathParams),
			method,
			signal,
			data: body,
			headers: requestHeaders,
		})

		return response.data
	} catch (e) {
		if (e instanceof Error || e instanceof AxiosError) {
			if (e.message.includes("Network Error")) {
				// ! Handle network errors
				/**
				 * You can trigger a notification to inform the user that their network is faulty
				 */
				throw e
			}

			if ("isAxiosError" in e) {
				// !  handle axios errors
				/**
				 * Check error code. If 401, you can either refresh the token or log the user out. You can  handle other cases as well
				 */
				throw e
			}
		}
		throw e
	}
}

const resolveUrl = (
	url: string,
	queryParams: Record<string, string> = {},
	pathParams: Record<string, string> = {}
) => {
	let query = new URLSearchParams(queryParams).toString()
	if (query) query = `?${query}`
	return url.replace(/{\w*}/g, key => pathParams[key.slice(1, -1)]) + query
}
