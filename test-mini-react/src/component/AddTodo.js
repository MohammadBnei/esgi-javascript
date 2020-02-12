import { Components, createDomNode } from 'mini-react-iw3'

export default class AddTodo extends Components {
	constructor(props) {
		super(props)

		this.state = {
			title: ''
		}

		this.el = this.renderInput.bind(this)()
	}

	renderInput() {
		const $input = createDomNode('input', {
			placeholder: 'Add a todo...',
			value: ''
		}, {
			change: (e) => this.state.title = e.target.value
		})

		const $button = createDomNode('button', {}, {
			click: () => {
				let { title } = this.state
				this.props.addTodo(title)
				title = ''
				$input.value = ''
			}
		}, 'Add')
		
        
		return [$input, $button]
	}
    
	render() {
		return this.display({
			children: this.el
		})
	}
}