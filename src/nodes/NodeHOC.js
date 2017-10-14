import React from "react";

const NodeHOC = InnerComponent => {
  return class extends React.Component {
    handleChange = (key, fn = () => {}) => event => {
      // gross but a necessary evil, for now
      this._reactInternalFiber._debugOwner.stateNode.updateState(
        this.props.id
      )({
        ...this.props.state,
        [key]: fn(event.currentTarget.value)
      });
    };

    render() {
      const _state = this._reactInternalFiber._debugOwner.stateNode.state[
        this.props.id
      ];
      const state = _state && _state.state ? _state.state : {};
      const inputs = _state && _state.inputs ? _state.inputs : { value: [] };
      const x = _state && _state.x ? _state.x : 0;
      const y = _state && _state.y ? _state.y : 0;

      return (
        <foreignObject width={400} height={400} x={x} y={y}>
          <h1>{this.props.id}</h1>
          <InnerComponent
            {...this.props}
            state={state}
            inputs={inputs}
            updateState={this._reactInternalFiber._debugOwner.stateNode.updateState(
              this.props.id
            )}
            handleChange={this.handleChange.bind(this)}
          />
        </foreignObject>
      );
    }
  };
};

export default NodeHOC;
