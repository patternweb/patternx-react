import React, { Component } from 'react';
import Node from "./components/Node"
import get from 'lodash/get'

const Nodes = {
  THREE: {
    Color: {
      name: "Color",
      inports: [
        {
          "name": "r",
          "type": "number"
        },
        {
          "name": "g",
          "type": "number"
        },
        {
          "name": "b",
          "type": "number"
        }
      ],
      outports: [
        {
          "name": "Color",
          "type": "Color"
        }
      ]
    }
  }
}

class App extends Component {

  state = {
    value: 10,
    nodes: [
      {
        process: 0,
        component: "THREE.Color",
        x: 400,
        y: 400
      }
    ]
  }

  nodeClicked(event) {
    event.stopPropagation();
    // console.log(event.target)
  }

  svgClick(event) {
    const node = {
      process: Math.random(),
      component: "THREE.Color",
      x: event.pageX,
      y: event.pageY
    }
    this.setState({nodes: [...this.state.nodes, node] })
  }

  updateVal(event) {
    // console.log("updating", event.target.value)
    this.setState({value: event.target.value})
  }

  buildNode(node, index) {
    return <Node component={get(Nodes, node.component)} process={node} click={this.nodeClicked} key={node.process} />
  }

  render() {
    return (
      <svg id="graph" onDoubleClick={this.svgClick.bind(this)}>
        <g id="nodes">{this.state.nodes.map(this.buildNode.bind(this))}</g>
      </svg>
    );
  }

}

export default App;
