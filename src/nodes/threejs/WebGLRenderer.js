import * as React from "react";
import * as THREE from "three";

class WebGLRenderer extends React.Component {
  componentDidMount() {
    this.mounted = true;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.props.width / this.props.height,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.refs.container.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: this.props.color });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.camera.position.z = 5;

    requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  animate = () => {
    if (this.mounted) requestAnimationFrame(this.animate);
    this.cube.rotation.x += 0.1;
    this.cube.rotation.y += 0.1;
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    console.log(this.props.color);
    return <div ref="container" />;
  }
}

export default WebGLRenderer;
