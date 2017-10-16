import * as React from "react";
import NodeHOC from "../NodeHOC";

class PolygonNode extends React.Component {
  render() {
    const { radius } = this.props.input;
    return <h3>{radius}</h3>;
  }
}

export default NodeHOC(PolygonNode);
