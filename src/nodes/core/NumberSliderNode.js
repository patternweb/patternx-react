import * as React from "react";
import NodeHOC from "../NodeHOC";

class NumberSliderNode extends React.Component {
  static defaultProps = {
    state: {
      min: 0,
      max: 10,
      value: 5,
      step: 1
    }
  };

  render() {
    const { min, max, value, step } = this.props.state;
    const { handleChange } = this.props;
    return (
      <div>
        <input
          type="range"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={handleChange("value", parseFloat)}
        />
        <div>
          <label>
            Value<input disabled type="number" value={value} />
          </label>
        </div>
        <div>
          <label>
            Step<input
              type="number"
              value={step}
              onChange={handleChange("step", parseFloat)}
            />
          </label>
        </div>
        <div>
          <label>
            Min<input
              type="number"
              value={min}
              onChange={handleChange("min", parseFloat)}
            />
          </label>
        </div>
        <div>
          <label>
            Max<input
              type="number"
              value={max}
              onChange={handleChange("max", parseFloat)}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default NodeHOC(NumberSliderNode);
