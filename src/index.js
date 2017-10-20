import React from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph";
import registerServiceWorker from "./registerServiceWorker";

// import { nodes, edges } from "./graphs/split";
import { loadGistCode } from "./github/load_gist";

const nodes = {};

async function getGraphData() {
  const params = new URLSearchParams(window.location.search);
  const gistID = params.get("gist");
  if (gistID) {
    const gistCode = await loadGistCode(gistID);
    return JSON.parse(gistCode);
  } else {
    return nodes;
  }
}

getGraphData().then(nodes => {
  ReactDOM.render(
    <Graph nodes={nodes} edges={[]} />,
    document.getElementById("root")
  );
  registerServiceWorker();
});
