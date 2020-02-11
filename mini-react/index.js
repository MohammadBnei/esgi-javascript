// eslint-disable-next-line no-undef
import { mount, updateDOM } from './src/React/vdom'
import Components, { createDomNode } from './src/React/Components'
import { bus } from './src/React/utils'
import router from './src/React/Router/router'


/**
 * Initialize the React app with the root element if provided
 * If you use the provided router, you can omit this
 * Start listening to state changes of any component and updates the view accordingly
 * {Components} rootElement
 * {string} the id of the target in the index.html 
 */
const init = (rootElement, target = 'app') => {
	if (rootElement && rootElement instanceof Components) {
		mount(rootElement, target)
	}
	
	const stateUpdateBus = bus.subscribe('state:update', (element) => {
		updateDOM(element)
	})
}

export {
	router,
	bus,
	Components
}

module.exports = {
	init,
	router,
	bus,
	Components,
	createDomNode
};
