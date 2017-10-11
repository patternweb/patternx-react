import React, { Component } from "react";
import Libs from "./Libs";
import Node from "./components/Node";
import Edge from "./components/Edge";
import get from "lodash/get";

class Graph extends Component {
  state = {
    nodes: [],
    edges: []
  };

  constructor(props) {
    super(props);
    this.activeNodeId = undefined;
    this.dragOffset = undefined;
  }

  nodeClicked(event) {
    event.stopPropagation();
    console.log("node clicked");
  }

  inportClicked(inport, processId) {
    // console.log({inport, processId})
  }

  outportClicked(outport, processId) {
    console.log({ outport, processId });
    // const activeEdge = <Edge fromX={100} toX={100} fromY={100} toY={100} />
    // this.setState({...this.state, activeEdge})
  }

  handleMouseMove(event) {
    if (this.activeNodeId) {
      const { pageX, pageY } = event;
      this.setState(prevState => {
        const node = prevState.nodes.find(
          node => node.id === this.activeNodeId
        );
        node.x = pageX - this.dragOffset.x;
        node.y = pageY - this.dragOffset.y;
        return prevState;
      });
    }
  }

  svgClick(event) {
    const node = {
      id: `color-${Math.floor(10000 * Math.random())}`,
      component: Math.random() > 0.5 ? "THREE.Color" : "CORE.Array",
      x: event.pageX,
      y: event.pageY
    };
    this.setState(prevState => {
      prevState.nodes = prevState.nodes.concat(node);
      return prevState;
    });
  }

  setActiveNode(event) {
    const nodeId = event.currentTarget.id;

    const rect = event.currentTarget.getBoundingClientRect();

    this.dragOffset = {
      x: event.pageX - (rect.x + rect.width / 2),
      y: event.pageY - (rect.y + rect.height / 2)
    };

    this.activeNodeId = nodeId;
    // push node to end of state.nodes to put it on top of other nodes (z-index) before dragging
    this.setState(prevState => {
      prevState.nodes.push(
        prevState.nodes.splice(
          prevState.nodes.findIndex(node => node.id === this.activeNodeId),
          1
        )[0]
      );
      return prevState;
    });
  }

  handleMouseUp(event) {
    this.activeNodeId = undefined;
    this.dragOffset = undefined;
  }

  buildNode(node, index) {
    return (
      <Node
        id={node.id}
        x={node.x}
        y={node.y}
        key={node.id}
        component={get(Libs, node.component)}
        inportClicked={this.inportClicked}
        outportClicked={this.outportClicked.bind(this)}
        click={this.nodeClicked}
        setActiveNode={this.setActiveNode.bind(this)}
      />
    );
  }

  render() {
    return (
      <svg
        id="graph"
        onDoubleClick={this.svgClick.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
      >
        <g id="edges">
          <Edge fromX={100} fromY={200} toX={500} toY={700} />
        </g>
        <g id="nodes">{this.state.nodes.map(this.buildNode.bind(this))}</g>
      </svg>
    );
  }
}

export default Graph;
