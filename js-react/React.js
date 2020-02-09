function createElement (elem){
 
    console.log(elem.props);
    
    console.log(elem);
    return  render(elem)


}




function renderElem({ tagName, props, children}) {
    const el = document.createElement(tagName);
    for (const [k, v] of Object.entries(props)) {
      el.setAttribute(k, v);
    }
    for (const child of children) {
      el.appendChild(render(child));
    }
    return el;
  };
  function render(elem) {
    if (typeof elem === 'string') {
      return document.createTextNode(elem);
    }
    return renderElem(elem);
  };
  



export default { createElement };