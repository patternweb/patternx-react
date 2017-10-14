import { fromWebSocket } from "most-w3msg";
import React, { Component } from "react";
// const WebSocket = require('ws')

class SocketNode extends Component {
  state = {
    url: "ws://localhost:5555"
  };

  componentDidMount() {
    // const socket = new WebSocket(this.state.url)
    // const ws$ = fromWebSocket(socket, socket.close.bind(socket))
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.url} />
        <input type="button" value="connect" />
      </div>
    );
  }
}

export default SocketNode;
