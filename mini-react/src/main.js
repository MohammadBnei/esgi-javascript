// eslint-disable-next-line no-undef
import { mount, updateDOM } from './React/vdom'
import Components from './React/Components'
import { bus } from './React/utils'
import Todos from './component/Todos'


const todos = new Todos()


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
				todos
			]
		})
	}
}

const _root = new Root()

mount(_root, document.getElementById('app'))

const stateUpdateBus = bus.subscribe('state:update', (element) => {
	updateDOM(element)
})



/**
 * 
 counter.incrementCount()
 
 mount(render(_root), document.getElementById('app'))
 */