import { uuid, bus as eventBus, prop_access } from './utils'

/**
 * Extend the Components class to have access to lifecycle methods, state and pass props through the constructor
 * You must implement a render function
 */
export default class Components {
	constructor(props) {
		this.id = uuid.next().value
		this.tagName = 'div'
		this.attrs = {}
		this.events = {}
		this.children = []

		this.state = {}
		this.propTypes = null
		this.props = props

		this.setState = this.setState.bind(this)
		this.display = this.display.bind(this)
		this.shouldUpdate = this.shouldUpdate.bind(this)
		this.update = this.update.bind(this)
	}

	/**
	 * Merge the newState object to the current state of the class
	 * @param {Object} state 
	 */
	setState(state) {
		const oldState = this.state
		const newState = Object.assign({}, this.state, state)

		this.state = newState
	
		if (this.shouldUpdate(oldState, newState)) {
			this.update()
		}
	}

	shouldUpdate(oldState, newState) {
		if (Object.keys(oldState).length !== Object.keys(newState).length) {
			return true
		}

		for (const [k, v] of Object.entries(oldState)) {
			if (v !== newState[k]) {
				return true
			}
		}

		return false
	}

	update() {
		eventBus.publish('state:update', this)
	}

	/**
	 * Returns the DOM element corresponding to the options passed, or the components option if not specified
	 * @param {Destructured} tagName 
	 * @param {Destructured} attrs 
	 * @param {Destructured} events 
	 * @param {Destructured} children 
	 */
	display({
		tagName = this.tagName,
		attrs = this.attrs,
		events = this.events,
		children = this.children
	} = {
		tagName: this.tagName,
		attrs: this.attrs,
		events: this.events,
		children: this.children
	}) {
		
		// create the element
		// e.g. <div></div>
		const $el = createDomNode(tagName, attrs, events)

		$el.setAttribute('data-id', this.id)

		return [$el, children]
	}

	render() {
		throw new Error('Render function not defined')
	}
}

/**
 * Returns a DOM node containing the options passed
 * @param {string} tagName 
 * @param {Object} attributes
 * @param {Object} events
 * @param {DOMNode} children 
 */
export const createDomNode = (tagName, {...attrs}, {...events}, children) => {
	const $element = document.createElement(tagName)

	// add all attributes as specified in attrs
	// e.g. <div id="app"></div>
	for (const [k, v] of Object.entries(attrs)) {
		$element.setAttribute(k, v)
	}

	// add all events as specified in events
	for (const [k, v] of Object.entries(events)) {
		$element.addEventListener(k, v)
	}

	if (children instanceof HTMLElement) {
		$element.appendChild(children)
	}

	if (typeof children === 'string') {
		$element.appendChild(document.createTextNode(children))
	}

	return $element
}


