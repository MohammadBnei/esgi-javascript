import { uuid, bus as eventBus } from './utils'

export const lifecycle = {
	INITIAL: 0,
	MOUNTED: 1,
	UPDATE: 2,
	UNMOUNTED: 3
}

const {
	INITIAL,
} = lifecycle

/**
 * Extend the Components class to have access to lifecycle methods, state and pass props through the constructor
 * You must implement a render function
 */
class Components {
	constructor(props) {
		this.id = uuid.next().value
		this.tagName = 'div'
		this.attrs = {}
		this.events = {}
		this.children = []

		this.state = {}
		this.props = props

		this._internalState = INITIAL

		this.setState = this.setState.bind(this)
		this.display = this.display.bind(this)
		this.setInternalState = this.setInternalState.bind(this)
	}

	setInternalState(internalState) {
		if (Object.values(lifecycle).includes(internalState)){
			this.internalState = internalState
		} else {
			throw new Error(`${internalState.prototype.name}: ${internalState} is not a valid state`)
		}
	}
	
	/**
	 * Merge the newState object to the current state of the class
	 * Then publishes a state:update event 
	 * @param {Object} newState 
	 */
	setState(newState) {
		Object.assign(this.state, newState)
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

export default Components

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


