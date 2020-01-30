const { idGenerator, eventBus } = require('./utils')


class Components {
    constructor() {
        this.id = idGenerator.next().value
        this.type = 'div'
        this.attr = {}
        this.events = {}
        this.children = []

        this.state = {}
    }

    _getId() {
        return this.id
    }

    verifyType() {
        if (![
            'div',
            'h1'
        ].includes(this.type))
            throw new Error('Incorrect type')    
    }

    verifyEvents() {
        Object.keys(this.events).forEach(name => {
            if (!name.startsWith('on'))
                throw new Error(`Event ${name} is incorrect`)
        })
    }

    _getVdomElem() {
        this.verifyType()
        this.verifyEvents()

        return {
            type: this.type,
            attr: this.attr,
            events: this.events,
            children: this.children
        }
    }

    setState(newState) {
        Object.assign(this.state, newState)
        eventBus.publish('state:update', this.id)
    }
}

module.exports = Components
