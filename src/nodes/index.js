import * as BufferNode from "./sockets/BufferNode";
import * as WebSocketNode from "./sockets/WebSocketNode";
import * as NumberSliderNode from "./core/NumberSliderNode";
import * as NumberNode from "./core/NumberNode";
import * as LogNode from "./core/LogNode";
import * as CanvasNode from "./graphics/CanvasNode";
import * as PolygonNode from "./svg/PolygonNode";
import * as AddNode from "./math/AddNode";

import * as PopupNode from "./PopupNode";

const nodes = {
  Add: {
    node: AddNode.default,
    description: "adds two values",
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
  Popup: {
    node: PopupNode.default,
    description: "displays 3d output",
    implementation: PopupNode.implementation,
    inports: {
      scene: "Scene",
      camera: "Camera"
    }
  },
  WebSocket: {
    node: WebSocketNode.default,
    description: "streams data from a websocket",
    implementation: WebSocketNode.implementation,
    outports: {
      websocket: "Stream"
    }
  },
  Buffer: {
    node: BufferNode.default,
    description: "stores last X values from a stream",
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
    description: "user-adjustable number variable",
    outports: {
      value: "Number"
    },
    inports: {
      value: "Number" // need to remove this
    }
  },
  Log: {
    node: LogNode.default,
    description: "displays output of node as text",
    inports: {
      value: "Any"
    }
  },
  Canvas: {
    node: CanvasNode.default,
    description: "2D display",
    inports: {
      commands: "Array"
    }
  },
  Number: {
    node: NumberNode.default,
    description: "numeric variable",
    outports: {
      value: "Number"
    }
  },
  Polygon: {
    node: PolygonNode.default,
    description: "regular 2d polygon",
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
