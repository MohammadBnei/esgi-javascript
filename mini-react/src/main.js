// eslint-disable-next-line no-undef
const Components = require('./Components')

class H1 extends Components {
    constructor() {
        super()
        this.type = 'h1'
        this.attr = {
            'class': 'test',
        }
        this.events = {
            'onClick': this.toggleActivation
        }

    }
}

class Div extends Components {
    constructor() {
        super()
        this.type = 'div'

        this.children = [
            new H1()
        ]

        this.state = { isActivated: false }
    }

   toggleActivation() {
        const activation = !this.state.isActivated
        this.setState({
            isActivated: activation
        })
    }
}
const div = new Div()

console.log(div._getVdomElem(), div._getState(), div._getId())

div.toggleActivation()

console.log(div._getState())