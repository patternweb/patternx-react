import React from "react";
import { randomName } from "./utils";

class SearchBox extends React.Component {
  state = {
    query: ""
  };

  searchForQuery = event => {
    this.setState({ query: event.target.value });
  };

  componentDidMount() {
    this.refs.searchBox.focus();
  }

  addNode = nodeName => event => {
    // const node = this.props.nodes[nodeName]
    // addNode(id, component, x, y, state = undefined, input = undefined)
    this.props.addNode(
      randomName(),
      nodeName,
      this.props.normXY[0],
      this.props.normXY[1],
      undefined,
      Object.keys(this.props.nodes[nodeName].inports || undefined)
    );
    this.props.closeSearchBox();
  };

  render() {
    const results = Object.keys(this.props.nodes).filter(
      nodeName =>
        nodeName.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0
    );
    const { addNode, nodes } = this.props;
    const [x, y] = this.props.xy;
    console.log({ x, y });
    return (
      <g id="searchBox">
        <foreignObject x={x - 200} y={y - 20} width={400} height={200}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.searchForQuery}
            ref="searchBox"
            placeholder="Search..."
          />
          <ul style={{ width: "400px" }}>
            {results.map(result => (
              <li key={result} onClick={this.addNode(result)}>
                <h3>{result}</h3>
                {nodes[result].description}
              </li>
            ))}
          </ul>
        </foreignObject>
      </g>
    );
  }
}

export default SearchBox;
