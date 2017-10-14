import React from "react";
import BufferNode from "./nodes/BufferNode";
import NumberSliderNode from "./nodes/NumberSliderNode";
// import SocketNode from "./nodes/SocketNode"

const nodeTypes = {
  numberSlider: NumberSliderNode,
  buffer: BufferNode
};

class NewGraph extends React.Component {
  state = {
    slider1: {
      x: 10,
      y: 10,
      node: "numberSlider",
      state: {
        value: -11,
        min: -20,
        max: 20,
        step: 0.1
      }
    },
    buffer1: {
      x: 300,
      y: 100,
      node: "buffer",
      state: {
        bufferLimit: 5
      }
    },
    buffer2: {
      x: 800,
      y: 100,
      node: "buffer",
      state: {
        bufferLimit: 10
      }
    }
  };

  updateState = key => input => {
    this.setState(prevState => {
      prevState[key].state = Object.assign({}, prevState[key].state, input);
      // ...this.state[key].state
      // [key]: input
      // console.log(JSON.stringify(prevState))
      return prevState;
    });
  };

  render() {
    return (
      <svg id="graph">
        {Object.keys(this.state).map(key => {
          const SpecificNode = nodeTypes[this.state[key].node];
          return (
            <SpecificNode
              key={key}
              id={key}
              state={this.state[key]}
              updateState={this.updateState(key).bind(this)}
            />
          );
        })}
      </svg>
    );
  }
}

export default NewGraph;
