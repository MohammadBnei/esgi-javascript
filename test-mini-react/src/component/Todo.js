import { Components, createDomNode, prop_access, type_check } from 'mini-react-iw3'

export default class Todo extends Components {
	constructor(props) {
		super(props)
        this.tagName = 'li'
        this.attrs = {
            class: 'todo'
        }

        this.verifyProps.bind(this)()
    }
    
    verifyProps() {
        let propsCheck = [
            'todo',
            'todo.id',
            'todo.completed',
            'todo.titles',
            'changeTodo'
        ]

        propsCheck = propsCheck.map(prop => !!prop_access(this.props, prop))

        if (propsCheck.includes(false)) {
            throw new Error('Incorrect props')
        }

        const confTodo = {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                },
                title: {
                    type: 'string',
                },
                completed: {
                    type: 'boolean',
                }
            },
        }                             

        if (!type_check(this.props.todo, confTodo)) {
            throw new Error('Incorrect props')
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