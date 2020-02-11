export default (_root, $target) => {
	const cwm = []
	const cdm = []
	const $root = getDOMelement(_root, { beforeRender: cwm, afterRender: cdm })
	
	for (const fn in cwm) {
		fn()
	}
	$target.replaceWith($root)
	for (const fn in cdm) {
		fn()
	}
}

const getDOMelement = (element, {
	beforeRender, afterRender
}) => {
	if (element instanceof HTMLElement) {
		return element
	}
	
	const [$element, children] = element.render()

	if (element.componentDidMount) {
		afterRender.push(element.componentDidMount)
	}
	if (element.componentWillMount) {
		beforeRender.push(element.componentWillMount)
	}

	children.forEach(child => {
		if (typeof child === 'string') {
			const $child = document.createTextNode(child)
			$element.appendChild($child)
		} else {
			const $child = getDOMelement(child, {
				beforeRender, afterRender
			})
			$element.appendChild($child)
		}
	})

	return $element
}