import React from "react";

const Edge = ({ fromX, fromY, toX, toY }) => (
  <path className="edge" d={`M${fromX},${fromY} L${toX},${toY}`} />
);

export default Edge;
