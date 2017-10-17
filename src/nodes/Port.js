import React from "react";

const handlePortClick = (clickFn, name, processId) => event => {
  event.stopPropagation();
  clickFn(name, processId, event.currentTarget);
};

const Port = ({ id, name, type, y, clickFn, processId }) => (
  <text
    y={y}
    id={id}
    onClick={handlePortClick(clickFn, name, processId)}
    shape-rendering="cripEdges"
  >
    {name}
    {`<${type}>`}
  </text>
);

export default Port;
