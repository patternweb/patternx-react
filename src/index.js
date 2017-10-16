import React from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Graph />, document.getElementById("root"));

registerServiceWorker();
