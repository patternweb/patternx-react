import { just, combineArray } from "most";
import React, { Component } from "react";
import NodeHOC from "../NodeHOC";

function implementation(socket$, bufferSize) {
  const nextWindow = (slidingWindow, x) =>
    slidingWindow.concat(x.data).slice(-bufferSize);
  return socket$.scan(nextWindow, []);
  // ws$.throttle(1000).scan(nextWindow, []).observe(array => this.setState({items: array}))
}

class BufferNode extends Component {
  static defaultProps = {
    input: {
      bufferSize: 10
    }
  };

  state = {
    items: []
  };

  componentDidMount() {
    combineArray(implementation, [this.props.inputs.stream, just(10)]);
    // implementation(this.props.inputs.stream, this.props.state.bufferSize).observe(
    //   array => this.setState({ items: array })
    // )
  }

  render() {
    const { bufferSize } = this.props.input;
    return (
      <div>
        <p>
          buffer: {this.state.items.length}/{bufferSize}
        </p>
        <ul>
          {this.state.items
            .slice(0)
            .reverse()
            .map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

export default NodeHOC(BufferNode);
