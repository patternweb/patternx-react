import * as BufferNode from "./sockets/BufferNode";
import * as WebSocketNode from "./sockets/WebSocketNode";
import * as NumberSliderNode from "./core/NumberSliderNode";
import * as NumberNode from "./core/NumberNode";
import * as LogNode from "./core/LogNode";
import * as CanvasNode from "./graphics/CanvasNode";
import * as PolygonNode from "./svg/PolygonNode";
import * as AddNode from "./math/AddNode";

import * as BoxNode from "./threejs/BoxNode";

const nodes = {
  Add: {
    node: AddNode.default,
    implementation: AddNode.implementation,
    fn: AddNode.fn,
    inports: {
      x: "Number",
      y: "Number"
    },
    outports: {
      result: "Number"
    }
  },
  Box: {
    node: BoxNode.default,
    implementation: BoxNode.implementation,
    inports: {
      width: "Number",
      height: "Number"
    }
  },
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
    fn: NumberSliderNode.fn,
    outports: {
      value: "Number"
    },
    inports: {
      value: "Number" // need to remove this
    }
  },
  Log: {
    node: LogNode.default,
    inports: {
      value: "Any"
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
