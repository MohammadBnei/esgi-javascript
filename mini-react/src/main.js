// eslint-disable-next-line no-undef
import { mount, updateDOM } from './React/vdom'
import Components from './React/Components'
import { bus } from './React/utils'
import Todos from './component/Todos'
import Counter from './component/Counter'
import router from './React/Router/router'


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

const counter = new Counter()

const addRoute = router()

addRoute('/', _root)
addRoute('/counter', counter)



const stateUpdateBus = bus.subscribe('state:update', (element) => {
	updateDOM(element)
})
