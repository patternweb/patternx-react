import * as BufferNode from "./BufferNode";
import * as WebSocketNode from "./WebSocketNode";
import * as NumberSliderNode from "./NumberSliderNode";
import * as NumberNode from "./NumberNode";
import * as CanvasNode from "./CanvasNode";
import * as PolygonNode from "./svg/PolygonNode";

const nodes = {
  WebSocket: {
    node: WebSocketNode.default,
    implementation: WebSocketNode.implementation,
    outports: {
      websocket: "Stream"
    }
  },
  Buffer: {
    node: BufferNode.default,
    inports: {
      stream: "Stream",
      bufferSize: "Number"
    },
    outports: {
      array: "Array"
    }
  },
  NumberSlider: {
    node: NumberSliderNode.default,
    outports: {
      value: "Number"
    }
  },
  Canvas: {
    node: CanvasNode.default,
    inports: {
      commands: "Array"
    }
  },
  Number: {
    node: NumberNode.default,
    outports: {
      value: "Number"
    }
  },
  Polygon: {
    node: PolygonNode.default,
    inports: {
      radius: "number",
      vertexCount: "number",
      angle: "number",
      top: "number",
      left: "number"
    },
    outports: {
      value: "point[]"
    }
  }
};

export default nodes;
