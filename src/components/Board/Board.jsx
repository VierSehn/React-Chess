import React from "react";

import Square from "./Square";
import "./Board.css";

const renderBoard = () => {
  const result = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      result.push(<Square color={(i + j) % 2 ? "black" : "white"} />);
    }
  }
  return result;
};

const Board = () => {
  return <div className="board">{renderBoard()}</div>;
};

export default Board;

// {`{ x: ${value.x}, y: ${value.y} }`}
