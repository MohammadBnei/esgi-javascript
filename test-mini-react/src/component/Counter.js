import { Components } from 'mini-react-iw3'
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
		this.buttonBack = new Button(this.goPrev, 'back')

	}

	incrementCount() {
		
		this.setState({
			count: ++this.state.count
		})


	}
	 goPrev(){ 
		window.history.back() 
	 }

	render() {
		
		return this.display({
			children: [
				`The count is : ${this.state.count}`,
				this.button,
				'\n',
				this.buttonBack
			]
		})
	}
}

export default Counter