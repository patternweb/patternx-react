import React from "react";
import nodes from "./nodes";
import exampleState from "./graphs/new";
import { randomName } from "./utils";
import bindAll from "lodash/bindAll";

class Graph extends React.Component {
  state = exampleState;

  constructor(props) {
    super(props);
    bindAll(this, [
      "addEdge",
      "addRandomNode",
      "handleClick",
      "handleDoubleClick",
      "handleMouseMove",
      "handleMouseUp",
      "inportClicked",
      "outportClicked",
      "resetActiveEdge",
      "setActiveNode",
      "updateState"
    ]);

    this.resetActiveEdge();
  }

  updateState = key => input => {
    this.setState(prevState => {
      prevState[key].state = Object.assign({}, prevState[key].state, input);
      return prevState;
    });
  };

  handleMouseMove(event) {
    if (!this.activeNodeId) return;
    const { pageX, pageY } = event;
    this.setState(prevState => {
      prevState[this.activeNodeId].x = pageX - this.dragOffset.x;
      prevState[this.activeNodeId].y = pageY - this.dragOffset.y;
      return prevState;
    });
  }

  handleClick(event) {
    if (event.target === this.refs.svg) this.resetActiveEdge();
  }

  handleMouseUp(event) {
    this.activeNodeId = undefined;
  }

  handleDoubleClick(event) {
    if (event.target === this.refs.svg) {
      this.addRandomNode(event);
    }
  }

  setActiveNode(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    this.dragOffset = {
      x: event.pageX - (rect.x + rect.width / 2),
      y: event.pageY - (rect.y + rect.height / 2)
    };
    this.activeNodeId = event.currentTarget.id;
  }

  addNode(id, component, x, y, state = undefined, input = undefined) {
    this.setState(prevState => {
      prevState[id] = {
        x,
        y,
        component
      };
      if (state) prevState[id].state = state;
      if (input) prevState[id].input = input;
      return prevState;
    });
  }

  removeNode(id) {
    this.setState(prevState => {
      delete prevState[id];
      return prevState;
    });
  }

  addRandomNode(event) {
    this.addNode(randomName(), "Log", event.pageX, event.pageY);
  }

  resetActiveEdge() {
    this.activeEdge = {
      from: undefined,
      to: undefined
    };
  }

  addEdge(edgeProperties) {
    console.log("ADDING EDGE", edgeProperties);
    this.resetActiveEdge();
  }

  inportClicked(inport, processId) {
    console.log({ inport, processId });
    this.activeEdge.to = { port: inport, processId };

    if (this.activeEdge.from) this.addEdge(this.activeEdge);
  }

  outportClicked(outport, processId, port) {
    console.log({ outport, processId, port });
    this.activeEdge.from = { port: outport, processId };

    if (this.activeEdge.to) this.addEdge(this.activeEdge);
    // const rect = port.getBoundingClientRect();
    // this.setState({
    //   ...this.state,
    //   fromX: rect.x + rect.width,
    //   fromY: rect.y + rect.height / 2
    // });
    // const activeEdge = <Edge fromX={100} toX={100} fromY={100} toY={100} />
    // this.setState({...this.state, activeEdge})
  }

  render() {
    return (
      <svg
        id="graph"
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
        xmlns="http://www.w3.org/2000/svg"
        ref="svg"
      >
        {Object.keys(this.state).map(key => {
          const SpecificNode = nodes[this.state[key].component].node;
          return (
            <SpecificNode
              key={key}
              id={key}
              node={nodes[this.state[key].component]}
              x={this.state[key].x}
              y={this.state[key].y}
              state={this.state[key].state}
              input={this.state[key].input}
              updateState={this.updateState(key)}
              setActiveNode={this.setActiveNode}
              inportClicked={this.inportClicked}
              outportClicked={this.outportClicked}
            />
          );
        })}
      </svg>
    );
  }
}

export default Graph;
