const state = {
  socket: {
    x: 200,
    y: 150,
    component: "WebSocket",
    state: {
      url: "wss://tweetstorm.patternx.cc"
    }
  },
  canvas: {
    x: 800,
    y: 200,
    component: "Canvas"
  },
  slider: {
    x: 700,
    y: 150,
    component: "NumberSlider",
    state: {
      value: -11,
      min: -20,
      max: 20,
      step: 0.1
    }
  },
  buffer1: {
    x: 300,
    y: 400,
    component: "Buffer",
    input: {
      bufferSize: 5
    }
  },
  buffer2: {
    x: 800,
    y: 400,
    component: "Buffer",
    input: {
      bufferSize: 10
    }
  },
  number: {
    x: 200,
    y: 800,
    component: "Number",
    state: {
      value: 0
    }
  },
  polygon: {
    x: 400,
    y: 800,
    component: "Polygon"
  }
}

export default state;
