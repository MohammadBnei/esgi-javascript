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

	const subscribe = (eventType, callback) => {
		const id = getNextUniqueId.next().value

		if (!subscribtions[eventType])
			subscribtions[eventType] = {}
        
		subscribtions[eventType][id] = callback
        
		return {
			unsubscribe: () => {
				delete subscribe[eventType][id]
				if (Object.keys(subscribtions[eventType]).length === 0)
					delete subscribtions[eventType]
			}
		}
	}

	const publish = (eventType, arg) => {
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



const generator = idGenerator()
const bus = eventBus()

export {
	generator,
	bus
}