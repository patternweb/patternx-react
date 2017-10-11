import React, { Component } from 'react';

function buildInport(port, index) {
  return <text y={ (index+1) * 20} key={`inport.${port.name}`}>{port.name}{`<${port.type}>`}</text>
}

function buildOutport(port, index) {
  return <text y={ (index+1) * 20} key={`outport.${port.name}`}>{port.name}{`<${port.type}>`}</text>
}

const [width, height] = [250, 100];

class Node extends Component {
  render() {
    const { name, inports, outports } = this.props.component;
    const { x, y } = this.props.process;
    return (
      <g className="node" onClick={this.props.click} transform={`translate(${x},${y})`}>
        <rect width={width} height={height} x={-width/2} y={-height/2} />
        <text className="name" y={-height/2+20}>{name}</text>
        <g className="inports" transform={`translate(${-width/2},${-height/2+30})`}>{inports.map(buildInport)}</g>
        <g className="outports" transform={`translate(${width/2},${-height/2+30})`}>{outports.map(buildOutport)}</g>
      </g>
    );
  }
}

export default Node;
