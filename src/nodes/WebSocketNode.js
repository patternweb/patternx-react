import { from } from "most";
import { fromWebSocket } from "most-w3msg";
import React, { Component } from "react";
import NodeHOC from "./NodeHOC";
// const WebSocket = require('ws')

export function implementation(url = undefined) {
  if (url) {
    const socket = new WebSocket(url);
    // this.socket.onerror = function(event) {
    //   console.log(event)
    // }
    return fromWebSocket(socket, socket.close.bind(socket));
  } else {
    return from([]);
  }
}

class WebSocketNode extends Component {
  state = {
    connected: false
  };

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  toggleConnect() {
    if (this.state.connected) {
      alert("cannot disconnect right now");
      // this.socket = just()
      // this.setState({ connected: false });
    } else {
      this.socket = implementation(this.props.state.url);
      this.setState({ connected: true });
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.state.url}
          onChange={this.props.handleChange("url")}
        />
        <input
          type="button"
          value={this.state.connected ? "disconnect" : "connect"}
          onClick={this.toggleConnect.bind(this)}
        />
      </div>
    );
  }
}

export default NodeHOC(WebSocketNode);
