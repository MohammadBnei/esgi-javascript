// eslint-disable-next-line no-undef
import { mount } from './vdom'
import Components from './Components'
import Counter from './component/Counter'
import { bus } from './utils';


class Image extends Components {
	constructor() {
		super()
		this.tagName = 'img'
		this.attrs = {
			src: 'https://media.giphy.com/media/eGrYr7UkywqhIBlWth/giphy.gif',
		}
	}

	render() {
		return this.display()
	}
}

const counter = new Counter()


class Button extends Components {
	constructor() {
		super()
		this.tagName = 'button'
		this.events = {
			'click': counter.incrementCount
		}
		this.attrs = {
			'type': 'button'
		}
	}

	render() {
		return this.display({
			children: [
				'Increment'
			]
		})
	}
}

const image = new Image()
const counter2 = new Counter()

const btn = new Button()

class Root extends Components {
	constructor() {
		super()
		this.tagName = 'div'
		this.attrs = {
			id: 'app',
		}
	}

	render() {
		return this.display({
			children: [
				counter,
				image,
				counter2,
				btn
			]
		})
	}
}

const _root = new Root()

mount(_root.render(), document.getElementById('app'))

const stateUpdateBus = bus.subscribe('state:update', () => {
	mount(_root.render(), document.getElementById('app'))
})



/**
 * 
 counter.incrementCount()
 
 mount(render(_root), document.getElementById('app'))
 */