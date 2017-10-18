import React from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph";
import registerServiceWorker from "./registerServiceWorker";

import { nodes, edges } from "./graphs/split";
import { loadGistCode } from "./github/load_gist";

async function getGraphData() {
  const params = new URLSearchParams(window.location.search);
  const gistID = params.get("gist");
  if (gistID) {
    const gistCode = await loadGistCode(gistID);
    return JSON.parse(gistCode).nodes;
  } else {
    return nodes;
  }
}

getGraphData().then(nodes => {
  console.log(nodes);
  ReactDOM.render(
    <Graph nodes={nodes} edges={[]} />,
    document.getElementById("root")
  );
  registerServiceWorker();
});
