import { Components, createDomNode } from 'mini-react-iw3'

export default class Todo extends Components {
	constructor(props) {
		super(props)
        this.tagName = 'li'
        this.attrs = {
            class: 'todo'
        }
	}

	render() {
        const { todo, changeTodo } = this.props
        const $completed = createDomNode('input', Object.assign({
            'type': 'checkbox',
        }, todo.completed ? {'checked': ''} : {}), {
                'change': () => changeTodo({
                    ...todo,
                    completed: !todo.completed
            })
        })

        const $remove = createDomNode('a', {
            href: '#'
        }, {
                click: (e) => {
                    e.preventDefault()
                    this.props.removeTodo(todo.id)
                }
        }, 'X') 
        
		const children = [
			todo.title,
			'\n',
            $completed,
            $remove
		]
        
		return this.display({
			children
		})
	}
}