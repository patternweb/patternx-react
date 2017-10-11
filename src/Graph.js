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
    nodes: [],
    edges: []
  }

  constructor(props) {
    super(props)
    this.activeNodeId = undefined
  }

  nodeClicked(event) {
    event.stopPropagation();
    console.log('node clicked')
  }

  inportClicked(inport, processId) {
    // console.log({inport, processId})
  }

  outportClicked(outport, processId) {
    console.log({outport, processId})
  }

  handleMouseMove(event) {
    if (this.activeNodeId) {
      const { pageX, pageY } = event
      this.setState( prevState => {
        const node = prevState.nodes.find(node => node.id === this.activeNodeId)
        node.x = pageX
        node.y = pageY
        return prevState
      })
    }
  }

  svgClick(event) {
    const node = {
      id: `color-${Math.floor(10000 * Math.random())}`,
      component: "THREE.Color",
      x: event.pageX,
      y: event.pageY
    }
    this.setState(prevState => {
      prevState.nodes = prevState.nodes.concat(node)
      return prevState
    })
  }

  setActiveNode(nodeId) {
    this.activeNodeId = nodeId
  }

  handleMouseUp(event) {
    this.activeNodeId = undefined
  }

  buildNode(node, index) {
    return <Node
      id={node.id}
      x={node.x}
      y={node.y}
      key={node.id}
      component={get(Nodes, node.component)}
      inportClicked={this.inportClicked}
      outportClicked={this.outportClicked}
      click={this.nodeClicked}
      setActiveNode={this.setActiveNode.bind(this)} />
  }

  render() {
    return (
      <svg id="graph" onDoubleClick={this.svgClick.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseMove={this.handleMouseMove.bind(this)}>
        <g id="nodes">{this.state.nodes.map(this.buildNode.bind(this))}</g>
      </svg>
    );
  }

}

export default Graph;
