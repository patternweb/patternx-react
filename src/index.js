import React from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph";
import registerServiceWorker from "./registerServiceWorker";
// import { loadGistCode } from "./github/load_gist"

// const params = new URLSearchParams(window.location.search);
// const gistID = params.get("gist");
// if (gistID) {
//   loadGistCode(gistID)
//     .catch(err => alert(err.message))
//     .then(code => {
//       ReactDOM.render(<Graph remoteState={JSON.parse(code)} />, document.getElementById("root"));
//       registerServiceWorker();
//     });
// } else {
//   ReactDOM.render(<Graph />, document.getElementById("root"));
//   registerServiceWorker();
// }

ReactDOM.render(<Graph />, document.getElementById("root"));
registerServiceWorker();
