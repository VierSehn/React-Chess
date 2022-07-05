import React from "react";

import Square from "./Square";
import "./Board.css";

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((value, i) => (
        <Square key={i} color={(value.x + value.y) % 2 ? "black" : "white"} />
      ))}
    </div>
  );
};
export default Board;

// {`{ x: ${value.x}, y: ${value.y} }`}
