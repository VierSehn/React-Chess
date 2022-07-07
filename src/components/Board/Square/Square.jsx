import React from "react";

import "./Square.css";

const Square = ({ color }) => {
  return <div className={`square ${color}`}></div>;
};

export default Square;
