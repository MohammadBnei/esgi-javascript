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

	/**
	verifyTagName() {
		if (![
			'div',
			'h1'
		].includes(this.tagName))
			throw new Error('Incorrect tagName')    
	}

	verifyEvents() {
		Object.keys(this.events).forEach(name => {
			if (!name.startsWith('on'))
				throw new Error(`Event ${name} is incorrect`)
		})
	}

	_getVdomElem() {
		return {
			tagName: this.tagName,
			attrs: this.attrs,
			events: this.events,
			children: this.children,
			state: this.state
		}	
	}
	*/
}

export default Components

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


