import ReactDOM from './ReactDOM.js' ;
import React from './React.js' ;
import Component from './Component.js';
const child = {tagName: 'p',
    props: {
    id: 'text',

    }, 
    children: []
};

const app = {tagName: 'div',
    props: {
    id: 'test',
    value: 'val'
    }, 
    children: ["jlkjlkjlkjlkjlkjlkjlkklk",child]
};



class App extends Component {
	constructor(type, props,children) {
	  super(type, props,children);
	}
  
	render() {
	  return React.createElement("p", {}, "Hello everybody");
	}
  }

const element = React.createElement(
	App,{},
	React.createElement(child)
  );

ReactDOM.Render(
    React.createElement(app)
    );
