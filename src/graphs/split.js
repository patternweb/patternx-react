export const nodes = {
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
  slider3: {
    x: 1000,
    y: 150,
    component: "NumberSlider",
    state: {
      value: 10,
      min: -10,
      max: 10,
      step: 2
    }
  },
  add: {
    x: 600,
    y: 300,
    component: "Add",
    input: {
      x: "$slider1",
      y: "$slider2"
    }
  },
  add2: {
    x: 1200,
    y: 400,
    component: "Add",
    input: {
      x: "$add",
      y: "$slider3"
    }
  }
};

export const edges = [];
