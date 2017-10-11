import React, { Component } from 'react';
import Port from './Port';

const [width, height] = [250, 100];

const portParams = (port, index, processId) => ({ y: (index+1) * 20, name: port.name, type: port.type, processId })

class Node extends Component {

  buildInport(port, index) {
    return <Port {...portParams(port, index, this.props.process.id)} key={ [port.name, this.props.process.id].join(">") } clickFn={this.props.inportClicked} />
  }

  buildOutport(port, index) {
    return <Port {...portParams(port, index, this.props.process.id)} key={ [this.props.process.id, port.name].join(">") } clickFn={this.props.outportClicked} />
  }

  render() {
    const { name, inports, outports } = this.props.component;
    const { id, x, y } = this.props.process;
    return (
      <g id={id} className="node" onClick={this.props.click} transform={`translate(${x},${y})`}>
        <rect width={width} height={height} x={-width/2} y={-height/2} />
        <text className="name" y={-height/2+20}>{name}</text>
        <g className="inports" transform={`translate(${-width/2},${-height/2+30})`}>{inports.map(this.buildInport.bind(this))}</g>
        <g className="outports" transform={`translate(${width/2},${-height/2+30})`}>{outports.map(this.buildOutport.bind(this))}</g>
      </g>
    );
  }
}

export default Node;
