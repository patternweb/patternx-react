import React from "react";
import nodes from "./nodes";

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

class NewGraph extends React.Component {
  state = {
    socket: {
      x: 200,
      y: 150,
      component: "WebSocket",
      state: {
        url: "wss://tweetstorm.patternx.cc"
      }
    },
    canvas: {
      x: 800,
      y: 200,
      component: "Canvas"
    },
    slider: {
      x: 700,
      y: 150,
      component: "NumberSlider",
      state: {
        value: -11,
        min: -20,
        max: 20,
        step: 0.1
      }
    },
    buffer1: {
      x: 300,
      y: 400,
      component: "Buffer",
      input: {
        bufferSize: 5
      }
    },
    buffer2: {
      x: 800,
      y: 400,
      component: "Buffer",
      input: {
        bufferSize: 10
      }
    },
    number: {
      x: 200,
      y: 800,
      component: "Number",
      state: {
        value: 0
      }
    },
    polygon: {
      x: 400,
      y: 800,
      component: "Polygon"
    }
  };

  componentDidMount() {
    const socket$ = nodes["WebSocket"].implementation();
    socket$.observe(packet => console.log(packet));

    // const socket$ = nodes["WebSocket"].implementation("wss://tweetstorm.patternx.cc")
    // socket$.observe(packet =>
    //   // buffer implementation(socket$, 10)
    // )
  }

  updateState = key => input => {
    this.setState(prevState => {
      prevState[key].state = Object.assign({}, prevState[key].state, input);
      // ...this.state[key].state
      // [key]: input
      // console.log(JSON.stringify(prevState))
      return prevState;
    });
  };

  handleMouseMove(event) {
    if (this.activeNodeId) {
      const { pageX, pageY } = event;
      this.setState(prevState => {
        prevState[this.activeNodeId].x = pageX - this.dragOffset.x;
        prevState[this.activeNodeId].y = pageY - this.dragOffset.y;
        return prevState;
      });
    }
  }

  handleMouseUp(event) {
    this.activeNodeId = undefined;
    this.dragOffset = undefined;
  }

  setActiveNode(event) {
    const nodeId = event.currentTarget.id;
    const rect = event.currentTarget.getBoundingClientRect();
    this.dragOffset = {
      x: event.pageX - (rect.x + rect.width / 2),
      y: event.pageY - (rect.y + rect.height / 2)
    };
    this.activeNodeId = nodeId;
    console.log(this.state);
    // // push node to end of state.nodes to put it on top of other nodes (z-index) before dragging
    // this.setState(prevState => {
    //   prevState.nodes.push(
    //     prevState.nodes.splice(
    //       prevState.nodes.findIndex(node => node.id === this.activeNodeId),
    //       1
    //     )[0]
    //   );
    //   return prevState;
    // });
  }

  render() {
    return (
      <svg
        id="graph"
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        xmlns="http://www.w3.org/2000/svg"
      >
        {Object.keys(this.state).map(key => {
          const SpecificNode = nodes[this.state[key].component].node;
          return (
            <SpecificNode
              key={key}
              id={key}
              node={nodes[this.state[key].component]}
              x={this.state[key].x}
              y={this.state[key].y}
              state={this.state[key].state}
              input={this.state[key].input}
              updateState={this.updateState(key).bind(this)}
              setActiveNode={this.setActiveNode.bind(this)}
            />
          );
        })}
      </svg>
    );
  }
}

export default NewGraph;
