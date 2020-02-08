import Components from "../Components"

export default class Button extends Components {
	constructor(onClick, text) {
		super({onClick, text})
		this.tagName = 'button'
		this.events = {
			'click': onClick
		}
		this.attrs = {
			'type': 'button'
		}
	}

	render() {
		return this.display({
			children: [
				String(this.props.text)
			]
		})
	}
}