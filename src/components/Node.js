import React, { Component } from 'react';
import Port from './Port';

const [width, height] = [250, 100];

const portParams = (port, index, processId) => ({ y: (index+1) * 20, name: port.name, type: port.type, processId })

class Node extends Component {

  buildInport(port, index) {
    return <Port {...portParams(port, index, this.props.id)} key={ [port.name, this.props.id].join(">") } clickFn={this.props.inportClicked} />
  }

  buildOutport(port, index) {
    return <Port {...portParams(port, index, this.props.id)} key={ [this.props.id, port.name].join(">") } clickFn={this.props.outportClicked} />
  }

  shouldComponentUpdate(nextProps) {
    if (
      (this.props.x !== nextProps.x) ||
      (this.props.y !== nextProps.y)
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { name, inports, outports } = this.props.component;
    const { id, x, y } = this.props;
    return (
      <g id={id} className="node" onMouseDown={() => this.props.setActiveNode(id) } onClick={this.props.click} transform={`translate(${x},${y})`}>
        <rect width={width} height={height} x={-width/2} y={-height/2} />
        <text className="name" y={-height/2+20}>{name}</text>
        <g className="inports" transform={`translate(${-width/2},${-height/2+30})`}>{inports.map(this.buildInport.bind(this))}</g>
        <g className="outports" transform={`translate(${width/2},${-height/2+30})`}>{outports.map(this.buildOutport.bind(this))}</g>
      </g>
    );
  }
}

export default Node;
