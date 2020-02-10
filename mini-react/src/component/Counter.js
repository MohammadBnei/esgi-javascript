import Components from '../React/Components'
import Button from './Button'

class Counter extends Components {
	constructor() {
		super()
		this.tagName = 'div'
		this.state = {
			count: 0,
		}

		this.incrementCount = this.incrementCount.bind(this)

		this.button = new Button(this.incrementCount, 'Increment')
	}

	incrementCount() {
		this.setState({
			count: ++this.state.count
		})
	}

	render() {
		return this.display({
			children: [
				`The count is : ${this.state.count}`,
				this.button
			]
		})
	}
}

export default Counter