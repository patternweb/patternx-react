import * as React from "react";
import NodeHOC from "../NodeHOC";

export function implementation(value) {
  return value;
}

export const fn = o => o.value;

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
    const { min, max, step } = this.props.state;
    const { handleChange, value = 1 } = this.props;
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
