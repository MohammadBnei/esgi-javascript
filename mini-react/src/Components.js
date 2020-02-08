import { uuid, bus as eventBus } from './utils'


class Components {
	constructor() {
		this.id = uuid.next().value
		this.tagName = 'div'
		this.attrs = {}
		this.events = {}
		this.children = []

		this.state = {}
	}

	_getId() {
		return this.id
	}

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
	
	setState(newState) {
		Object.assign(this.state, newState)
		eventBus.publish('state:update')
	}

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
		const $el = document.createElement(tagName)

		// add all attributes as specified in attrs
		// e.g. <div id="app"></div>
		for (const [k, v] of Object.entries(attrs)) {
			$el.setAttribute(k, v)
		}

		// add all events as specified in events
		for (const [k, v] of Object.entries(events)) {
			$el.addEventListener(k, v)
		}

		// append all children as specified in vNode.children
		// e.g. <div id="app"><img></div>
		for (const child of children) {
			let $child

			if (typeof child === 'string')
				$child = document.createTextNode(child)
			else 
				$child = child.render()
			
			$el.appendChild($child)
		}

		return $el
	}
}

export default Components
