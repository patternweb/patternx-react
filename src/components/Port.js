import React from "react";

const handlePortClick = (clickFn, name, processId) => event => {
  event.stopPropagation();
  clickFn(name, processId);
};

const Port = ({ name, type, y, clickFn, processId }) => (
  <text y={y} onClick={handlePortClick(clickFn, name, processId)}>
    {name}
    {`<${type}>`}
  </text>
);

export default Port;
