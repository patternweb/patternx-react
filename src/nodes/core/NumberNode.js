import * as React from "react";
import NodeHOC from "../NodeHOC";

class NumberNode extends React.Component {
  static defaultProps = {
    state: {
      value: 0
    }
  };

  render() {
    const { value } = this.props.state;
    const { handleChange } = this.props;
    return (
      <input
        type="number"
        value={value}
        onChange={handleChange("value", parseFloat)}
      />
    );
  }
}

export default NodeHOC(NumberNode);
