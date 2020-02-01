const createElement = (tagName, { attrs = {}, events = {}, children = []} = {}) => {
	return {
		tagName,
		attrs,
		events,
		children
	}
}

export default createElement