const state = {
  slider1: {
    x: 200,
    y: 150,
    component: "NumberSlider",
    state: {
      value: 3,
      min: -20,
      max: 20,
      step: 1
    }
  },
  slider2: {
    x: 200,
    y: 400,
    component: "NumberSlider",
    state: {
      value: 10,
      min: -10,
      max: 10,
      step: 2
    }
  },
  add: {
    x: 700,
    y: 300,
    component: "Add",
    input: {
      a: "$slider1",
      b: "$slider2"
    }
  }
};

export default state;
