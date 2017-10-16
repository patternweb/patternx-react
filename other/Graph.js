import React, { Component } from "react";
import Libs from "./Libs";
import Node from "./components/Node";
import Edge from "./components/Edge";
import get from "lodash/get";
import { createFiles, createGist, loadGistCode } from "./github";

class Graph extends Component {
  state = {
    nodes: [],
    edges: [],
    fromX: 0,
    fromY: 0
  };

  constructor(props) {
    super(props);
    this.activeNodeId = undefined;
    this.dragOffset = undefined;

    const params = new URLSearchParams(window.location.search);
    const gistID = params.get("gist");
    if (gistID) {
      loadGistCode(gistID)
        .catch(err => alert(err.message))
        .then(code => {
          this.setState(JSON.parse(code));
        })
        .catch(err => alert(err.message));
    }
  }

  nodeClicked(event) {
    event.stopPropagation();
    console.log("node clicked");
  }

  inportClicked(inport, processId) {
    // console.log({inport, processId})
  }

  outportClicked(outport, processId, port) {
    const rect = port.getBoundingClientRect();
    this.setState({
      ...this.state,
      fromX: rect.x + rect.width,
      fromY: rect.y + rect.height / 2
    });
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

  saveGist(event) {
    console.log("saving...");
    createGist(createFiles(JSON.stringify(this.state, null, 2)))
      .then(gist => {
        console.log(gist);
        const params = new URLSearchParams(window.location.search);
        params.set("gist", gist.id);
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params}`
        );
      })
      .catch(err => console.error(err.message));
  }

  render() {
    return (
      <svg
        id="graph"
        onDoubleClick={this.svgClick.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
      >
        <g id="edges" />
        <g id="nodes">{this.state.nodes.map(this.buildNode.bind(this))}</g>
        <Edge
          fromX={this.state.fromX}
          fromY={this.state.fromY}
          toX={500}
          toY={700}
        />

        <text x={20} y={20} onClick={this.saveGist.bind(this)}>
          Save Gist
        </text>
      </svg>
    );
  }
}

export default Graph;
