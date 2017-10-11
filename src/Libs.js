const Libs = {
  THREE: {
    Color: {
      name: "Color",
      inports: [
        {
          name: "r",
          type: "number"
        },
        {
          name: "g",
          type: "number"
        },
        {
          name: "b",
          type: "number"
        }
      ],
      outports: [
        {
          name: "Color",
          type: "Color"
        }
      ]
    }
  },
  CORE: {
    Array: {
      name: "Array",
      inports: [
        {
          name: "items",
          type: "collection"
        }
      ],
      outports: [
        {
          name: "Array",
          type: "Array"
        }
      ]
    }
  }
};

// {
//   component: "THREE.Color",
//   id: "color0",
//   x: 400,
//   y: 400
// }

export default Libs;
