import React from "react";
import ReactDOM from "react-dom";
import NewGraph from "./NewGraph";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<NewGraph />, document.getElementById("root"));

registerServiceWorker();
