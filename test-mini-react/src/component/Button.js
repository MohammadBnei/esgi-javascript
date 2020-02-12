import { Components } from 'mini-react-iw3'

export default class Button extends Components {
	constructor(onClick, text) {
		super({onClick, text})
		this.tagName = 'button'
		this.events = {
			'click': onClick
		}
		this.attrs = {

			'type': 'button',
			class : 'button'
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