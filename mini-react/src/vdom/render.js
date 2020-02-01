const renderElem = ({ tagName, attrs, events, children }) => {
	// create the element
	// e.g. <div></div>
	const $el = document.createElement(tagName)

	// add all attributes as specified in vNode.attrs
	// e.g. <div id="app"></div>
	for (const [k, v] of Object.entries(attrs)) {
		$el.setAttribute(k, v)
	}

	// add all events as specified in vNode.events
	for (const [k, v] of Object.entries(events)) {
		$el.addEventListener(k, v)
	}

	// append all children as specified in vNode.children
	// e.g. <div id="app"><img></div>
	for (const child of children) {
		const $child = render(child)
		$el.appendChild($child)
	}

	return $el
}

const render = (VNode) => {
	if (typeof VNode === 'string') {
		return document.createTextNode(vNode)
	}

	const  vNode = new VNode()

	return renderElem(vNode._getVdomElem())
}

export default render