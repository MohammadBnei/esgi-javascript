import Component from "./component.js";

class App extends Component {
  constructor(type, props,children) {
    super(type, props,children);
  }

  render() {
    return React.createElement("p", {}, "Hello everybody");
  }
}

App.prototype.propTypes = {
  yo: "toto",
  
};

export default App;
