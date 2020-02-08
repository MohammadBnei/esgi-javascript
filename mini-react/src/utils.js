const idGenerator = function* () {
	const random = () => Math.floor(Math.random() * 100000)
	const ids = []

	while (true) {
		let id = random()
		while (ids.includes(id)) {
			id = random()
		}
		yield id
	}
}

const eventBus = () => {
	const subscribtions = {}
	const getNextUniqueId = idGenerator()

	/**
	 * Subscribe to an event
	 * @param {string} eventType The name of the event you want to subscribe to
	 * @param {fn} callback The function to execute whe the event is fired
	 */
	const subscribe = (eventType, callback) => {
		const id = getNextUniqueId.next().value

		if (!subscribtions[eventType])
			subscribtions[eventType] = {}
        
		subscribtions[eventType][id] = callback
        
		return {
			/**
			 * Remove the subscribtion to the event
			 */
			unsubscribe: () => {
				delete subscribe[eventType][id]
				if (Object.keys(subscribtions[eventType]).length === 0)
					delete subscribtions[eventType]
			}
		}
	}

	/**
	 * Publish an event
	 * @param {string} eventType The name of the event so thate every subscriber listening to it gets an update
	 * @param {*} arg the arguments passed to the callbacks
	 */
	const publish = (eventType, ...arg) => {
		if (!subscribtions[eventType])
			return
        
		Object.keys(subscribtions[eventType])
			.forEach(id => subscribtions[eventType][id](arg))
	}

	return {
		subscribe,
		publish
	}
}



const uuid = idGenerator()
const bus = eventBus()

export {
	uuid,
	bus
}