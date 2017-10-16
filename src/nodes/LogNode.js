import * as React from "react";
import NodeHOC from "./NodeHOC";

class LogNode extends React.Component {
  static defaultProps = {
    state: {
      value: 0
    }
  };

  render() {
    const { value } = this.props.input;
    return <textarea defaultValue={value} disabled />;
  }
}

export default NodeHOC(LogNode);
