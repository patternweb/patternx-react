import React, { Component } from 'react';
import Node from "./components/Node"

class App extends Component {

  state = {
    value: 10
  }

  nodeClicked(event) {
    event.stopPropagation();
    // console.log(event.target)
  }

  svgClick(event) {
    console.log(event)
  }

  updateVal(event) {
    // console.log("updating", event.target.value)
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <svg onClick={this.svgClick}>
        <Node name="a node" click={this.nodeClicked} val={this.state.value} updateVal={this.updateVal.bind(this)} />
      </svg>
    );
  }

}

export default App;
