// import WebSocket from "ws"

// export const websocket = {
//   fn: o => {
//     const socket = new WebSocket(o.url);
//     socket.on("message", processMessage)
//     return processMessage
//   },
//   inports: ["url"]
// }

// export const buffer = {
//   fn: o => {
//     o.socket.on("message", data => {
//       // update("A", { x: parseFloat(data) })
//       console.log(data)
//     });
//   },
//   inports: ["socket"]
// }

export const delayedAdd = {
  fn: o =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(o.x + o.y), 500);
    }),
  inports: ["x", "y"]
};

export const add = {
  fn: o => o.x + o.y,
  inports: ["x", "y"]
};

export const sub = {
  fn: o => o.a - o.b,
  inports: ["a", "b"]
};

export const log = {
  fn: o => {
    console.log(o.a);
    return o.a;
  },
  inports: ["a"]
};
