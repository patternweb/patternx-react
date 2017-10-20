import bindAll from "lodash/bindAll";
import Edge from "./Edge";
import nodes from "./nodes";
import React from "react";
import SearchBox from "./SearchBox";
import SignalGraph from "./signals/index";
import SVGPZ from "svg-pan-zoom";
import { randomName } from "./utils";
import { createGist } from "./github/create_gist";
import { createFiles } from "./github/files";

const Mouse = {
  UP: 0,
  DOWN: 1
};

class Graph extends React.Component {
  state = {
    nodes: {},
    edges: [[0, 1]],
    searchBox: undefined
  };

  mouse = Mouse.UP;
  signalGraph = SignalGraph();

  componentDidMount() {
    this.resetActiveEdge();

    this.signalGraph.signal.add(payload => {
      this.setState(prevState => {
        prevState.nodes[payload[0]].value = payload[1];
        return prevState;
      });
    });

    for (const key of Object.keys(this.props.nodes)) {
      const node = this.props.nodes[key];
      this.addNode(key, node.component, node.x, node.y, node.state, node.input);
    }

    this.panZoom = SVGPZ(this.refs.svg, {
      center: Object.keys(this.state.nodes) > 0,
      controlIconsEnabled: true,
      dblClickZoomEnabled: false,
      fit: Object.keys(this.state.nodes) > 0,
      maxZoom: 1,
      minZoom: 0.1,
      panEnabled: true,
      preventMouseEventsDefault: false,
      viewportSelector: this.refs.viewport,
      zoomEnabled: true,
      zoomScaleSensitivity: 0.3
    });
  }

  svgPoint = (x, y) => {
    let point = this.refs.svg.createSVGPoint();
    point.x = x;
    point.y = y;
    point = point.matrixTransform(this.refs.viewport.getCTM().inverse());
    return [Math.floor(point.x), Math.floor(point.y)];
  };

  updateState = key => input => {
    if (input.value !== undefined) {
      this.signalGraph.update(key, input);
    } else {
      this.setState(prevState => {
        prevState.nodes[key].state = Object.assign(
          {},
          prevState.nodes[key].state,
          input
        );
        // console.log(key, input)
        this.signalGraph.update(key, input);
        return prevState;
      });
    }
  };

  handleMouseMove = event => {
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
      prevState.nodes[this.activeNodeId].x = x - this.dragOffset.x;
      prevState.nodes[this.activeNodeId].y = y - this.dragOffset.y;
      return prevState;
    });
  };

  openPopup = node => {
    console.log(`window.open(undefined, "${node}", "height=300,width=300")`);
    window.open(undefined, node, "height=300,width=300");
  };

  handleContextMenu = event => {
    event.preventDefault();
  };

  handleMouseUp = event => {
    this.mouse = Mouse.UP;
    this.activeNodeId = undefined;
    this.panZoom.enablePan();
  };

  handleMouseDown = event => {
    this.mouse = Mouse.DOWN;
  };

  handleClick = event => {
    if (event.target === this.refs.svg) {
      this.resetActiveEdge();
      if (this.state.searchBox !== undefined) this.closeSearchBox();
    }
  };

  handleDoubleClick = event => {
    if (event.target === this.refs.svg) {
      // this.addRandomNode(event);
      this.setState({ searchBox: [event.pageX, event.pageY] });
    }
  };

  setActiveNode = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    const [x, y] = this.svgPoint(event.pageX, event.pageY);
    this.dragOffset = {
      x: x - this.svgPoint(rect.x + rect.width / 2, 0)[0],
      y: y - this.svgPoint(0, rect.y + rect.height / 2)[1]
    };
    this.activeNodeId = event.currentTarget.id;
  };

  addNode = (id, component, x, y, state = undefined, input = undefined) => {
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

      prevState.nodes[id] = {
        x,
        y,
        component
      };
      if (state) prevState.nodes[id].state = state;
      if (input) prevState.nodes[id].input = input;
      return prevState;
    });
  };

  removeNode(id) {
    this.setState(prevState => {
      delete prevState.nodes[id];
      return prevState;
    });
  }

  addRandomNode = event => {
    const [x, y] = this.svgPoint(event.pageX, event.pageY);
    this.addNode(randomName(), "NumberSlider", x, y);
  };

  resetActiveEdge = () => {
    this.activeEdge = {
      from: undefined,
      to: undefined
    };
  };

  addEdge = edgeProperties => {
    // console.log("ADDING EDGE", edgeProperties);
    const newObject = {
      [edgeProperties.to.port]: `$${edgeProperties.from.processId}`
    };
    this.signalGraph.update(edgeProperties.to.processId, newObject);

    this.setState(prevState => {
      prevState.nodes[edgeProperties.to.processId].input = Object.assign(
        {},
        prevState.nodes[edgeProperties.to.processId].input,
        newObject
      );
      return prevState;
    });

    const signalNode = this.signalGraph.nodes[edgeProperties.to.processId];

    signalNode.listeners.push(
      this.signalGraph.signal
        .filter(
          payload => "$" + payload[0] === `$${edgeProperties.from.processId}`
        )
        .add(payload => {
          signalNode.update({ [edgeProperties.to.port]: payload[1] });
          this.signalGraph.run(edgeProperties.to.processId);
        })
    );
    this.signalGraph.run(edgeProperties.from.processId);

    this.resetActiveEdge();
  };

  inportClicked = (inport, processId) => {
    // console.log({ inport, processId });
    this.activeEdge.to = { port: inport, processId };

    if (this.activeEdge.from) this.addEdge(this.activeEdge);
  };

  outportClicked = (outport, processId, port) => {
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
  };

  buildNode = key => {
    const SpecificNode = nodes[this.state.nodes[key].component].node;
    return (
      <SpecificNode
        id={key}
        inportClicked={this.inportClicked}
        input={this.state.nodes[key].input}
        key={key}
        node={nodes[this.state.nodes[key].component]}
        openPopup={this.openPopup}
        outportClicked={this.outportClicked}
        setActiveNode={this.setActiveNode}
        state={this.state.nodes[key].state}
        updateState={this.updateState(key)}
        value={this.state.nodes[key].value}
        x={this.state.nodes[key].x}
        y={this.state.nodes[key].y}
      />
    );
  };

  buildEdge(key) {
    return <Edge key={key} fromX={100} fromY={100} toX={500} toY={500} />;
  }

  saveGraph = () => {
    // console.log(JSON.stringify(this.state, null, 2));
    createGist(createFiles(this.state.nodes))
      .then(gist => {
        console.log(gist);
        const params = new URLSearchParams(window.location.search);
        params.set("gist", gist.id);
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params}`
        );
      })
      .catch(err => console.error(err.message));
  };

  closeSearchBox = event => {
    this.setState({ searchBox: undefined });
  };

  render() {
    const searchBox =
      this.state.searchBox !== undefined ? (
        <SearchBox
          ref="searchBox"
          closeSearchBox={this.closeSearchBox}
          nodes={nodes}
          addNode={this.addNode}
          xy={this.state.searchBox}
          normXY={this.svgPoint(...this.state.searchBox)}
        />
      ) : (
        ""
      );

    return (
      <svg
        id="graph"
        onClick={this.handleClick}
        /*onContextMenu={this.handleContextMenu}*/
        onDoubleClick={this.handleDoubleClick}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        ref="svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref="viewport">
          {Object.keys(this.state.nodes).map(this.buildNode)}
        </g>

        <text
          className="button"
          x={10}
          y={20}
          onClick={this.saveGraph}
          fill="white"
        >
          Save Graph
        </text>

        {searchBox}
      </svg>
    );
  }
}
// {Object.keys(this.state.nodes.filter(n => n.input)).map(this.buildEdge)}

export default Graph;
