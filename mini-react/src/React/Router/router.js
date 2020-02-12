import { bus } from "../utils"
import { mount } from "../vdom";
import { createDomNode } from "../Components";
//import { createDomNode } from "../../../../test-mini-react";



export default () => {
    const appDiv = "app";

    // Both set of different routes and template generation functions
    const routes = {};

    // Define the routes. Each route is described with a route path & a template to render
    // when entering that path. A template can be a string (file name), or a function that
    // will directly create the DOM objects.
    const addRoute = (path, rootComponent) => {
        return routes[path] = rootComponent;
    };

    const resolveRoute = (route) => {
        try {
            return routes[route]
        } catch (error) {
            throw new Error('Route not defined')
        }
    }

    const router = (evt) => {
        const url = window.location.pathname || "/"
        const routeResolved = resolveRoute(url) || createDomNode('span',{}, {}, '404 not found')
        mount(routeResolved, document.getElementById(appDiv))
    }
    // For first load or when routes are changed in browser url box.
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);

    return addRoute
} 