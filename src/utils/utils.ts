export const safeArray = <T>(arg: unknown | Array<T>): Array<T> => {
	if (Array.isArray(arg)) {
		return arg
	} else {
		return []
	}
}
