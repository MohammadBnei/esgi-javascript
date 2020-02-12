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
			.forEach(id => subscribtions[eventType][id](...arg))
	}

	return {
		subscribe,
		publish
	}
}

/**
 * Returns the object located at the path put
 * Returns false if not found
 * {Object} the object to compare
 * {String} the search path
 */
const prop_access =  (object, path) => {
    if (path === "" || path === null ) {
        return object;
    }

    let pathWay = path.trim().split('.');

    let tmp = object;

    for (let i = 0; pathWay.length; i++) {

        if (i === pathWay.length) {
            return true;
        }

        if (!Object.prototype.hasOwnProperty.call(tmp, pathWay[i])) {
            console.log(path + " does not exist");
            return false;
        }


        tmp = tmp[pathWay[i]];

    }
    return true;

}

/**
 * Returns true if the object's structure and elements are similar to the passed conf
 * @param {Object} value to compare
 * @param {Object} conf configuration in the form { type, properties }
 */
const type_check = (value, conf) => {
	const type_check_v2 = (object, typev2) => {
		const type_check_v1 = (object, typev1) => {
			switch(typeof object){
				case 'object':
					if(Array.isArray(object)) return typev1 === "array";
					if(object === null) return typev1 === "null";
				default:
					return typeof  object === typev1;
			}

		}

		for (const [k, v] of Object.entries(typev2)) {
			switch (k) {
				default:
					if (!type_check_v1(object, v)) return false;
					break;
			}
		}

		return true
	}

    if (
        !conf.hasOwnProperty('properties') ||
        typeof value !== 'object' ||
        conf.type !== 'object'
    ) {
        return false;
    }

    for (let property in conf.properties) {
        let isValid = type_check_v2(value[property], conf.properties[property]);
        if (!isValid) {
            return false;
        }
    }

    return true;
}





const uuid = idGenerator()
const bus = eventBus()

export {
	uuid,
	bus,
	prop_access,
	type_check
}