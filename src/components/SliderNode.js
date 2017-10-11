import React, { Component } from "react";

class Node extends Component {
  render() {
    return (
      <g onClick={this.props.click}>
        <text y="10" x="10">
          {this.props.name}
        </text>
        <foreignObject y={30} x={30}>
          <input
            type="range"
            value={this.props.val}
            onChange={this.props.updateVal}
            min={0}
            max={20}
            step={1}
          />
        </foreignObject>
      </g>
    );
  }
}

export default Node;
