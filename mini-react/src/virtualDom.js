import { bus as eventBus } from './utils'

const vdomElements = {}

export default virtualDom = (rootElement) => {
    eventBus.subscribe('state:update', (id) => {
        const element = getElement(id)
        addAllElements()
    })
    
    
    const createElem = ({
        type, attr, events
    }) => {
            const elem = document.createElement(type)
            elem.attribute = attr
            Object.keys(events).forEach(e => {
            elem[e] = events[e]
        })
        
        return elem
    }

    const addAllElements = ({
        children,
        ...element
    }, parent) => {
        parent.appendChild(createElem(element))
        addAllElements(children)
    }

    const getDOMElement = () => {
        return document.getElementById(this.id)
    }

    const getVDOMElement = (id) => {
        let res = undefined
        let currentElement = this
        
        while (res === undefined) {
            if (currentElement.id === id)
                res = currentElement
            else if (currentElement.children.length > 0)
        }
        vdomElements.forEach(e => {
            if (e.id === id)
                res = e
                else
                getVDOMElement(id, e.children)
            })
            return res
    }
}

module.export = virtualDom