import { Components, createDomNode } from 'mini-react-iw3'
import Button from './Button'

export default class From extends Components {
	constructor(props) {
		super(props)
        this.tagName = 'form'

		this.state = {
            name: '',
            name2: '',
            output: ''
		}

		this.el = this.renderInput.bind(this)()
	}





	renderInput() {
		const $input = createDomNode('input', {
			placeholder: 'You name ...',
			value: ''
		}, {
			change: (e) => this.state.name = e.target.value
        })
        const $input2 = createDomNode('input', {
			placeholder: 'You age ...',
			value: ''
		}, {
			change: (e) => this.state.name2 = e.target.value
        })
        const $output = createDomNode('span', {
            value: this.state.output
         		}, {
		})

		const $button = createDomNode('button',{}, {
			click: () => {
				let { name,name2,output } = this.state
                this.props.From(name,name2)
                output = 'hello'.name2
				name = ''
                name2 = ''

			}
		}, 'send')
        
		return [$input,$input2,$output, $button]
	}

	render() {
        
      
		return this.display({
			children: this.el
		})
	}
}
