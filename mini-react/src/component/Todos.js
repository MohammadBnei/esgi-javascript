import Components from '../React/Components'
import Axios from 'axios'
import Todo from './Todo'
import AddTodo from './AddTodo'

export default class Todos extends Components {
	constructor() {
		super()
		this.state = {
			todos: []
		}
        
		this.componentDidMount = this.componentDidMount.bind(this)
		this.updateTodo = this.updateTodo.bind(this)
		this.addTodo = this.addTodo.bind(this)
		this.removeTodo = this.removeTodo.bind(this)

		this.$addTodo = new AddTodo({addTodo: this.addTodo})
	}
    
	componentDidMount() {
		Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
			.then(({ data }) => this.setState({
				todos: data
			}))
	}
    
	updateTodo(todo) {
		Axios.put('https://jsonplaceholder.typicode.com/todos/' + todo.id, todo)
			.then(({ data }) => {
                
				const todos = this.state.todos.map(_todo => _todo.id === data.id ? data : _todo)
                
				this.setState({
					todos
				})
			})
	}
    
	addTodo(title) {
		Axios.post('https://jsonplaceholder.typicode.com/todos', {
			title,
			completed: false
		})
			.then(({ data }) => {
                
				const todos = [
					data,
					...this.state.todos
				]
                
				this.setState({
					todos
				})
			})
	}
    
	removeTodo(_id) {
		Axios.delete('https://jsonplaceholder.typicode.com/todos/' + _id)
			.then(() => {
				const todos = this.state.todos.filter(({ id }) => _id !== id)
				this.setState({
					todos
				})
			})
	}

	render() {
		return this.display({
			children: [
				this.$addTodo,
				...this.state.todos.map(todo => new Todo({
					todo,
					changeTodo: this.updateTodo,
					removeTodo: this.removeTodo
				}))
			]
		})
	}
}