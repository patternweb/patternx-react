import { Signal } from "micro-signals";
import Node from "./node";

export default function SignalGraph() {
  const signal = new Signal();

  const nodes = {};

  const addNode = (id, fn, ob, inports) => {
    if (nodes[id]) throw Error("Node already exists with that ID");
    nodes[id] = nodes[id] || new Node(id, fn, ob, inports);
    return nodes[id];
    // Object.keys(ob).forEach(key => {
    //   nodes[id].listeners.push(
    //     signal.filter(payload => "$" + payload[0] === ob[key]).add(payload => {
    //       nodes[id].update({ [key]: payload[1] });
    //       run(id);
    //     })
    //   );
    //   run(ob[key][1]);
    //   // console.log('running', ob[key])
    // });
    // // run(id);
  };

  function removeNode(id) {
    signal.dispatch([id, undefined]);
    nodes[id].remove();
    delete nodes[id];
  }

  function run(id, exists = false) {
    if (exists || nodes[id]) {
      // console.log("RUNNING " + id)
      nodes[id].run(result => signal.dispatch([id, result]));
    }
  }

  function update(id, params) {
    if (nodes[id]) {
      nodes[id].update(params);
      run(id, true);
    }
  }

  return {
    addNode,
    removeNode,
    nodes,
    run,
    update,
    signal
  };
}
