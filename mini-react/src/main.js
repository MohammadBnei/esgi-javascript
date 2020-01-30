// eslint-disable-next-line no-undef
import { render, createElement, mount, diff } from './vdom'

const createVApp = (count) => createElement('div', {
	attrs: {
		id: 'app',
		dataCount: count,
	},
	children: [
		'The current count is: ',
		String(count),
		createElement('img', {
			attrs: {
				src: 'https://media.giphy.com/media/eGrYr7UkywqhIBlWth/giphy.gif',
			}
		})
	]
})

let count = 0
let vApp = createVApp(count)

const $app = render(vApp)

let $rootEl = mount($app, document.getElementById('app'))

setInterval(() => {
	count++
	const vNewApp = createVApp(count)
	const patch = diff(vApp, vNewApp)
    
	$rootEl = patch($rootEl)
    
	vApp = vNewApp
}, 1000)

console.log($app)