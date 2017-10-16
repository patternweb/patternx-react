import React from "react";
import nodes from "./nodes";
import exampleState from "./graphs/new";
import { randomName } from "./utils";

class Graph extends React.Component {
  state = exampleState;

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

  handleMouseUp(event) {
    this.activeNodeId = undefined;
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

  render() {
    return (
      <svg
        id="graph"
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onDoubleClick={this.addRandomNode.bind(this)}
        xmlns="http://www.w3.org/2000/svg"
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
              updateState={this.updateState(key).bind(this)}
              setActiveNode={this.setActiveNode.bind(this)}
            />
          );
        })}
      </svg>
    );
  }
}

export default Graph;
