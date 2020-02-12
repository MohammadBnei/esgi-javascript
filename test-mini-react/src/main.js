
import { init, router, Components } from 'mini-react-iw3'
import Todos from './component/Todos'
import Counter from './component/Counter'
import Form from './component/Form'


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
const form = new Form();
const addRoute = router()

addRoute('/', _root)
addRoute('/counter', counter)
addRoute('/form', form) 

init()