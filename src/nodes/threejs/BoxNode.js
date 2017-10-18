import * as React from "react";
import NodeHOC from "../NodeHOC";
import * as THREE from "three";

export function implementation(_) {
  return _;
}

class BoxNode extends React.Component {
  width = 300;
  height = 300;

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.refs.container.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.camera.position.z = 5;

    requestAnimationFrame(this.animate);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.cube.rotation.x += 0.1;
    this.cube.rotation.y += 0.1;
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    const { openPopup } = this.props;
    console.log(this.props);
    return (
      <div
        ref="container"
        onClick={() => openPopup(this.props.id)}
        width={this.width}
        height={this.height}
      />
    );
  }
}

export default NodeHOC(BoxNode);
