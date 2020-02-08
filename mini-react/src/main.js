// eslint-disable-next-line no-undef
import { mount } from './vdom'
import Components from './Components'

class Counter extends Components {
	constructor() {
		super()
		this.tagName = 'div'
		this.state = {
			count: 0
		}
		this.events = {
			onclick: this.incrementCount.bind(this)
		}
	}

	incrementCount() {
		const c = this.state.count + 1
		this.setState({
			count: c
		})
	}

	render() {
		return this.display({
			children: [
				`The count is : ${this.state.count}`
			]
		})
	}

}

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

const image = new Image()
const counter = new Counter()

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
			]
		})
	}
}

const _root = new Root()

mount(_root.render(), document.getElementById('app'))

/**
 * 
 counter.incrementCount()
 
 mount(render(_root), document.getElementById('app'))
 */