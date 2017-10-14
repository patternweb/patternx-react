import React from "react";

const NodeHOC = InnerComponent => {
  return class extends React.Component {
    handleChange = (key, fn = () => {}) => event => {
      this.props.updateState({
        ...this.props.state,
        [key]: fn(event.currentTarget.value)
      });
    };

    render() {
      const {
        state = {},
        inputs = { value: [] },
        x = 0,
        y = 0
      } = this.props.state;

      return (
        <foreignObject width={400} height={400} x={x} y={y}>
          <h1>{this.props.id}</h1>
          <InnerComponent
            {...this.props}
            state={state}
            inputs={inputs}
            updateState={this.props.updateState}
            handleChange={this.handleChange.bind(this)}
          />
        </foreignObject>
      );
    }
  };
};

export default NodeHOC;
