// import SignalGraph from "./index"
// import nodes from "./nodes"
// import chalk from "chalk"

// const g = SignalGraph();

// g.addNode("B", nodes.sub, { a: "$A", b: 50 });
// g.addNode("C", nodes.add, { x: 2, y: 2 });
// g.addNode("D", nodes.add, { x: "$C", y: "$B" });
// g.addNode("E", nodes.add, { x: "$B", y: 11.43 });
// g.addNode("A", nodes.add, { x: 4, y: 5 });

// // addNode("W", nodes.websocket, { url: "wss://tweetstorm.patternx.cc" })
// // addNode("BU", nodes.buffer, { socket: "$W" })

// // run all leaf nodes
// Object.keys(g.nodes)
//   // find all nodes where the input value does not begin with $
//   .filter(nodeName =>
//     Object.values(g.nodes[nodeName].input).every(input => input[0] !== "$")
//   )
//   .map(node => {
//     console.log(chalk.grey("RUNNING"), node);
//     g.run(node);
//   });

// setTimeout(() => {
//   g.addNode("F", add, { x: "$D", y: "$A" });
//   g.removeNode("D");

//   console.log(
//     Object.keys(g.nodes).map(key => {
//       const node = g.nodes[key];
//       return [node.id, node.input, node.output];
//     })
//   );
// }, 1000);

// // setInterval(() => g.update("C", { x: parseInt(Math.random() * 4) }), 100);
// // setInterval(() => update("A", { x: parseInt(Math.random()*4) }), 250)
// // setInterval(() => update("B", { b: parseInt(Math.random()*4) }), 320)
