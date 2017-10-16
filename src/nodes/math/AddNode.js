import * as React from "react";
import NodeHOC from "../NodeHOC";

export function implementation(a = 0, b = 0) {
  return a + b;
}

export const fn = o => o.x + o.y;

class AddNode extends React.Component {
  static defaultProps = {
    state: {
      value: 0
    }
  };

  render() {
    return <p>{this.props.value}</p>;
  }
}

export default NodeHOC(AddNode);
