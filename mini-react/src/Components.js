import { uuid, eventBus } from './utils'


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
			children: this.children
		}
	}

	setState(newState) {
		Object.assign(this.state, newState)
		eventBus.publish('state:update', this.id)
	}
}

export default Components
