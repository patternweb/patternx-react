import bindAll from "lodash/bindAll";
import exampleState from "./graphs/unconnected";
import nodes from "./nodes";
import React from "react";
import SignalGraph from "./signals/index";
import SVGPZ from "svg-pan-zoom";
import { randomName } from "./utils";

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
      "handleMouseDown",
      "handleMouseMove",
      "handleMouseUp",
      "initPanZoom",
      "inportClicked",
      "outportClicked",
      "resetActiveEdge",
      "setActiveNode",
      "svgPoint",
      "updateState"
    ]);

    this.resetActiveEdge();
    this.signalGraph = SignalGraph();
    this.mouse = Mouse.UP;
  }

  initPanZoom() {
    this.panZoom = SVGPZ(this.refs.svg, {
      center: false,
      controlIconsEnabled: true,
      dblClickZoomEnabled: false,
      fit: true,
      maxZoom: 1,
      minZoom: 0.1,
      panEnabled: true,
      preventMouseEventsDefault: false,
      viewportSelector: this.refs.viewport,
      zoomEnabled: true,
      zoomScaleSensitivity: 0.3
    });
  }

  componentDidMount() {
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

    // doesn't work without timeout
    setTimeout(this.initPanZoom, 5);
  }

  svgPoint(x, y) {
    let point = this.refs.svg.createSVGPoint();
    point.x = x;
    point.y = y;
    point = point.matrixTransform(this.refs.viewport.getCTM().inverse());
    return [Math.floor(point.x), Math.floor(point.y)];
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

  handleContextMenu(event) {
    event.preventDefault();
  }

  handleMouseUp(event) {
    this.mouse = Mouse.UP;
    this.activeNodeId = undefined;
    this.panZoom.enablePan();
  }

  handleMouseDown(event) {
    this.mouse = Mouse.DOWN;
  }

  handleClick(event) {
    if (event.target === this.refs.svg) this.resetActiveEdge();
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
    const [x, y] = this.svgPoint(event.pageX, event.pageY);
    this.addNode(randomName(), "NumberSlider", x, y);
  }

  resetActiveEdge() {
    this.activeEdge = {
      from: undefined,
      to: undefined
    };
  }

  addEdge(edgeProperties) {
    // console.log("ADDING EDGE", edgeProperties);
    // this.signalGraph.update(edgeProperties.to.processId,
    //   { [edgeProperties.to.port]: `$${edgeProperties.from.processId}` })

    this.signalGraph.update("add", { x: "$slider1", y: "$slider2" });

    this.resetActiveEdge();
  }

  inportClicked(inport, processId) {
    // console.log({ inport, processId });
    this.activeEdge.to = { port: inport, processId };

    if (this.activeEdge.from) this.addEdge(this.activeEdge);
  }

  outportClicked(outport, processId, port) {
    // console.log({ outport, processId, port });
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
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
        onDoubleClick={this.handleDoubleClick}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        ref="svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref="viewport">
          {Object.keys(this.state).map(key => {
            const SpecificNode = nodes[this.state[key].component].node;
            return (
              <SpecificNode
                id={key}
                inportClicked={this.inportClicked}
                input={this.state[key].input}
                key={key}
                node={nodes[this.state[key].component]}
                outportClicked={this.outportClicked}
                setActiveNode={this.setActiveNode}
                state={this.state[key].state}
                updateState={this.updateState(key)}
                value={this.state[key].value}
                x={this.state[key].x}
                y={this.state[key].y}
              />
            );
          })}
        </g>
      </svg>
    );
  }
}

export default Graph;
