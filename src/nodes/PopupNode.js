import * as React from "react";
import NodeHOC from "./NodeHOC";
import Popout from "react-popout";
import WebGLRenderer from "./threejs/WebGLRenderer";

export function implementation(_) {
  return _;
}

class PopupNode extends React.Component {
  state = {
    isPoppedOut: false,
    color: "red"
  };

  popout = () => {
    this.setState({ isPoppedOut: true });
  };

  popoutClosed = () => {
    this.setState({ isPoppedOut: false });
  };

  render() {
    if (this.state.isPoppedOut) {
      return (
        <div>
          <Popout title={this.props.id} onClosing={this.popoutClosed}>
            <WebGLRenderer camera={this.camera} scene={this.scene} />
          </Popout>
          <p>(opened)</p>
        </div>
      );
    } else {
      return <h1 onClick={this.popout}>Open Popup</h1>;
    }
  }
}

export default NodeHOC(PopupNode);
