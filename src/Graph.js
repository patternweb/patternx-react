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

// {
//   component: "THREE.Color",
//   id: "color0",
//   x: 400,
//   y: 400
// }

class Graph extends Component {

  state = {
    nodes: []
  }

  nodeClicked(event) {
    event.stopPropagation();
  }

  inportClicked(inport, processId) {
    console.log({inport, processId})
  }

  outportClicked(outport, processId) {
    console.log({outport, processId})
  }

  svgClick(event) {
    const node = {
      id: `color-${Math.floor(10000 * Math.random())}`,
      component: "THREE.Color",
      x: event.pageX,
      y: event.pageY
    }
    this.setState({nodes: [...this.state.nodes, node] })
  }

  buildNode(node, index) {
    return <Node component={get(Nodes, node.component)} process={node} click={this.nodeClicked} key={node.id} inportClicked={this.inportClicked} outportClicked={this.outportClicked} />
  }

  render() {
    return (
      <svg id="graph" onDoubleClick={this.svgClick.bind(this)}>
        <g id="nodes">{this.state.nodes.map(this.buildNode.bind(this))}</g>
      </svg>
    );
  }

}

export default Graph;
