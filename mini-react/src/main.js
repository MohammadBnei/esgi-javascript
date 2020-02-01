// eslint-disable-next-line no-undef
import { render, mount, diff } from './vdom'
import Components from './Components'

class Image extends Components {
	constructor() {
		super()
		this.tagName = 'img'
		this.attrs = {
			src: 'https://media.giphy.com/media/eGrYr7UkywqhIBlWth/giphy.gif',
		}
	}
}

class Root extends Components {
	constructor() {
		super()
		this.tagName = 'div'
		this.attrs = {
			id: 'app',
		}
		this.children = [
			Image
		]
	}
}

const $app = render(Root)

let $rootEl = mount($app, document.getElementById('app'))

console.log($app)