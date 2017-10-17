import React from "react";
import nodes from "./nodes";
import exampleState from "./graphs/new";
import { randomName } from "./utils";
import bindAll from "lodash/bindAll";
import SignalGraph from "./signals/index";
import SVGPZ from "svg-pan-zoom";

const Mouse = {
  UP: 0,
  DOWN: 1
};

class Graph extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    bindAll(this, [
      "addEdge",
      "addRandomNode",
      "handleClick",
      "handleContextMenu",
      "handleDoubleClick",
      "handleMouseMove",
      "handleMouseUp",
      "handleMouseDown",
      "inportClicked",
      "outportClicked",
      "resetActiveEdge",
      "setActiveNode",
      "updateState",
      "svgPoint"
    ]);

    this.resetActiveEdge();
    this.signalGraph = SignalGraph();
    this.mouse = Mouse.UP;
  }

  svgPoint(x, y) {
    if (!this.svgViewport)
      this.svgViewport = document.querySelector(".svg-pan-zoom_viewport");
    this.svgDropPoint.x = x;
    this.svgDropPoint.y = y;
    const point = this.svgDropPoint.matrixTransform(
      this.svgViewport.getCTM().inverse()
    );
    return [Math.floor(point.x), Math.floor(point.y)];
  }

  componentDidMount() {
    this.svgDropPoint = this.refs.svg.createSVGPoint();

    this.signalGraph.signal.add(payload => {
      this.setState(prevState => {
        prevState[payload[0]].value = payload[1];
        return prevState;
      });
    });

    for (const key of Object.keys(exampleState)) {
      const node = exampleState[key];
      this.addNode(key, node.component, node.x, node.y, node.state, node.input);
    }

    setTimeout(() => {
      this.panZoom = SVGPZ("#graph", {
        zoomEnabled: true,
        panEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: false,
        preventMouseEventsDefault: false,
        zoomScaleSensitivity: 0.3,
        dblClickZoomEnabled: false,
        maxZoom: 1,
        minZoom: 0.1
      });
    }, 10);
  }

  updateState = key => input => {
    if (input.value !== undefined) {
      this.signalGraph.update(key, input);
    } else {
      this.setState(prevState => {
        prevState[key].state = Object.assign({}, prevState[key].state, input);
        // console.log(key, input)
        this.signalGraph.update(key, input);
        return prevState;
      });
    }
  };

  handleContextMenu(event) {
    event.preventDefault();
  }

  handleMouseDown(event) {
    this.mouse = Mouse.DOWN;
  }

  handleMouseMove(event) {
    if (this.panZoom && this.mouse === Mouse.UP) {
      if (event.target === this.refs.svg) {
        this.panZoom.enablePan();
      } else {
        this.panZoom.disablePan();
      }
    }

    if (!this.activeNodeId) return;

    const [x, y] = this.svgPoint(event.pageX, event.pageY);
    // const { pageX, pageY } = event;

    this.setState(prevState => {
      prevState[this.activeNodeId].x = x - this.dragOffset.x;
      prevState[this.activeNodeId].y = y - this.dragOffset.y;
      return prevState;
    });
  }

  handleClick(event) {
    if (event.target === this.refs.svg) this.resetActiveEdge();
  }

  handleMouseUp(event) {
    this.mouse = Mouse.UP;
    this.activeNodeId = undefined;
    this.panZoom.enablePan();
  }

  handleDoubleClick(event) {
    if (event.target === this.refs.svg) {
      this.addRandomNode(event);
    }
  }

  setActiveNode(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const [x, y] = this.svgPoint(event.pageX, event.pageY);
    this.dragOffset = {
      x: x - this.svgPoint(rect.x + rect.width / 2, 0)[0],
      y: y - this.svgPoint(0, rect.y + rect.height / 2)[1]
    };
    this.activeNodeId = event.currentTarget.id;
  }

  addNode(id, component, x, y, state = undefined, input = undefined) {
    this.setState(prevState => {
      // console.log(id, nodes[component].fn, input || {})
      const ob = input || {};
      const signalNode = this.signalGraph.addNode(
        id,
        nodes[component].fn,
        ob,
        Object.keys(nodes[component].inports || {})
      );

      Object.keys(ob).forEach(key => {
        signalNode.listeners.push(
          this.signalGraph.signal
            .filter(payload => "$" + payload[0] === ob[key])
            .add(payload => {
              signalNode.update({ [key]: payload[1] });
              this.signalGraph.run(id);
            })
        );
        this.signalGraph.run((input || {})[key][1]);
        // console.log('running', ob[key])
      });

      prevState[id] = {
        x,
        y,
        component
      };
      if (state) prevState[id].state = state;
      if (input) prevState[id].input = input;
      return prevState;
    });
  }

  removeNode(id) {
    this.setState(prevState => {
      delete prevState[id];
      return prevState;
    });
  }

  addRandomNode(event) {
    this.addNode(randomName(), "Log", event.pageX, event.pageY);
  }

  resetActiveEdge() {
    this.activeEdge = {
      from: undefined,
      to: undefined
    };
  }

  addEdge(edgeProperties) {
    console.log("ADDING EDGE", edgeProperties);
    this.resetActiveEdge();
  }

  inportClicked(inport, processId) {
    console.log({ inport, processId });
    this.activeEdge.to = { port: inport, processId };

    if (this.activeEdge.from) this.addEdge(this.activeEdge);
  }

  outportClicked(outport, processId, port) {
    console.log({ outport, processId, port });
    this.activeEdge.from = { port: outport, processId };

    if (this.activeEdge.to) this.addEdge(this.activeEdge);
    // const rect = port.getBoundingClientRect();
    // this.setState({
    //   ...this.state,
    //   fromX: rect.x + rect.width,
    //   fromY: rect.y + rect.height / 2
    // });
    // const activeEdge = <Edge fromX={100} toX={100} fromY={100} toY={100} />
    // this.setState({...this.state, activeEdge})
  }

  render() {
    return (
      <svg
        id="graph"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
        onContextMenu={this.handleContextMenu}
        xmlns="http://www.w3.org/2000/svg"
        ref="svg"
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
              updateState={this.updateState(key)}
              setActiveNode={this.setActiveNode}
              inportClicked={this.inportClicked}
              outportClicked={this.outportClicked}
              value={this.state[key].value}
            />
          );
        })}
      </svg>
    );
  }
}

export default Graph;
