import React, { Component } from "react";
import NodeHOC from "../NodeHOC";
// const WebSocket = require('ws')

class CanvasNode extends Component {
  componentDidMount() {
    var c = this.refs.canvas;
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
  }
  render() {
    return <canvas width={200} height={200} ref="canvas" />;
  }
}

export default NodeHOC(CanvasNode);
