import * as React from "react";
import NodeHOC from "../NodeHOC";

export function implementation(a = 0, b = 0) {
  return a + b;
}

class AddNode extends React.Component {
  static defaultProps = {
    state: {
      value: 0
    }
  };

  render() {
    const { a, b } = this.props.input;
    return <p>{implementation(a, b)}</p>;
  }
}

export default NodeHOC(AddNode);
