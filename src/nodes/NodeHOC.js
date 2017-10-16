import React from "react";
import Port from "./Port";

const portParams = (port, index, processId) => ({
  y: (index + 1) * 20,
  name: port,
  type: port,
  processId
});

const [width, height] = [300, 200];

const NodeHOC = InnerComponent => {
  return class extends React.Component {
    buildOutport(port, index) {
      const id = [this.props.id, port].join(">");
      return (
        <Port {...portParams(port, index, this.props.id)} key={id} id={id} />
      );
    }

    buildInport(port, index) {
      const id = [port, this.props.id].join("<");
      return (
        <Port {...portParams(port, index, this.props.id)} key={id} id={id} />
      );
    }

    handleChange = (key, fn = val => val) => event => {
      this.props.updateState({
        ...this.props.state,
        [key]: fn(event.currentTarget.value)
      });
    };

    render() {
      const { state = {}, input = { value: [] }, x = 0, y = 0 } = this.props;

      return (
        <g>
          <g
            id={this.props.id}
            className="node"
            transform={`translate(${x},${y})`}
            onMouseDown={this.props.setActiveNode}
          >
            <rect
              width={width}
              height={height}
              x={-width / 2}
              y={-height / 2}
            />
            <text className="name" y={-height / 2 + 20}>
              {this.props.id}
            </text>
            <g
              className="inports"
              transform={`translate(${-width / 2},${-height / 2 + 30})`}
            >
              {Object.keys(this.props.node.inports || []).map(
                this.buildInport.bind(this)
              )}
            </g>
            <g
              className="outports"
              transform={`translate(${width / 2},${-height / 2 + 30})`}
            >
              {Object.keys(this.props.node.outports || []).map(
                this.buildOutport.bind(this)
              )}
            </g>
          </g>
          <foreignObject width={width} height={200} x={x - width / 2} y={y}>
            <InnerComponent
              {...this.props}
              state={state}
              input={input}
              updateState={this.props.updateState}
              handleChange={this.handleChange.bind(this)}
            />
          </foreignObject>
        </g>
      );
    }
  };
};

export default NodeHOC;
