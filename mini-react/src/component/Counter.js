import Components from '../Components'

class Counter extends Components {
	constructor() {
		super()
		this.tagName = 'div'
		this.state = {
			count: 0,
		}
		
		this.incrementCount = this.incrementCount.bind(this)
	}

	incrementCount() {
		this.setState({
			count: ++this.state.count
		})
	}

	render() {
		return this.display({
			children: [
				`The count is : ${this.state.count}`
			]
		})
	}
}

export default Counter