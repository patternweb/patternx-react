const state = {
  slider: {
    x: 200,
    y: 250,
    component: "NumberSlider",
    state: {
      value: -11,
      min: -20,
      max: 20,
      step: 0.1
    }
  },
  log: {
    x: 700,
    y: 300,
    component: "Log",
    input: {
      value: "hello world"
    }
  }
};

export default state;
