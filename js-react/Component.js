
class Component {
	props = null;

	constructor(type, props,children) {
	  this.type = type;
	  this.props = props;
	//  this.event = event;
	  this.chidren = children;
	  this.state = {};
	}

	_getId() {
		return this.id
	}


	verifyEvents() {
		Object.keys(this.events).forEach(name => {
			if (!name.startsWith('on'))
				throw new Error(`Event ${name} is incorrect`)
		})
	}

	_getVdomElem() {
		return {
			tagName: this.tagName,
			attrs: this.attrs,
			events: this.events,
			children: this.children
		}
	}


	display(newProps) {
		var shouldUpdate = false;
		let isValid = typeCheck.typeCdroitheck(newProps, { properties: this.propTypes });
		if (isValid) {
		let shouldUpdate = this.shouldUpdate(this.props, newProps);
		if (shouldUpdate) {
			this.props = newProps;
			return this.render();
		}
		}
		return {...this};
	}

	shouldUpdate(props, oldProps) {
		return props !== oldProps;
	}

	render() {
		throw "render function needed";
	}



}

export default Component