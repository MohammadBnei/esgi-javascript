export default (element) => {
	const cwu = []
	const cdu = []
	const $newElement = getDOMelement(element, {
		beforeRender: cwu, afterRender: cdu
	})
    
	const $rootElement = document.querySelector(`[data-id="${element.id}"]`)
    
	for (const fn of cwu) {
		fn()
	}
	$rootElement.replaceWith($newElement)
	for (const fn of cdu) {
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

	if (element.componentDidUpdate) {
		afterRender.push(element.componentDidUpdate)
	}
	if (element.componentWillUpdate) {
		beforeRender.push(element.componentWillUpdate)
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
