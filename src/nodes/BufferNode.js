import { fromWebSocket } from "most-w3msg";
import React, { Component } from "react";
import NodeHOC from "./NodeHOC";
// const WebSocket = require('ws')

class BufferNode extends Component {
  static defaultProps = {
    state: {
      bufferLimit: 10
    }
  };

  state = {
    // bufferLimit: 10,
    items: []
  };

  componentDidMount() {
    const socket = new WebSocket("ws://labs.patternx.cc:5555");
    const ws$ = fromWebSocket(socket, socket.close.bind(socket));
    const nextWindow = (slidingWindow, x) =>
      slidingWindow.concat(x.data).slice(-this.props.state.bufferLimit);
    ws$.scan(nextWindow, []).observe(array => this.setState({ items: array }));
    // ws$.throttle(1000).scan(nextWindow, []).observe(array => this.setState({items: array}))
  }

  setBufferLimit(event) {
    this.setState({ bufferLimit: event.currentTarget.value });
  }

  render() {
    const { bufferLimit } = this.props.state;
    const { handleChange } = this.props;
    return (
      <div>
        <p>
          buffer: {this.state.items.length}/{bufferLimit}
        </p>
        <input
          type="range"
          min={1}
          max={30}
          value={bufferLimit}
          onChange={handleChange("bufferLimit", parseInt)}
        />
        <ul>
          {this.state.items
            .slice(0)
            .reverse()
            .map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    );
  }
  //onChange={this.setBufferLimit.bind(this)} />
}

export default NodeHOC(BufferNode);
