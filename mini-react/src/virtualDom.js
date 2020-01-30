const { eventBus } = require('./utils')

const virtualDom = (rootElement) => {
    eventBus.subscribe('state:update', (id) => {
        const element = getElement(id)
        element.
    })
}

module.export = virtualDom


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

const getElement = (id) => {
    return document.getElementById(id)
}