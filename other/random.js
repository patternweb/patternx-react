
// {
//   "socket>websocket": ["buffer1<stream", "buffer2<stream"],
//   "slider>number": ["buffer1<bufferSize"]
// // }

// // running order
// "socket"
// "slider"
// "buffer1"
// "buffer2"
// most.of(socket.implementation)
// combineArray(buffer1.implementation, [socket.websocket, null])
// combineArray(buffer2.implementation, [socket.websocket, null])
// combineArray(buffer1.bufferSize, [socket.websocket])
