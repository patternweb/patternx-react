import React from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph";
import registerServiceWorker from "./registerServiceWorker";

import { nodes, edges } from "./graphs/split";

ReactDOM.render(
  <Graph nodes={nodes} edges={edges} />,
  document.getElementById("root")
);

registerServiceWorker();
