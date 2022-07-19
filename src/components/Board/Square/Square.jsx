import React from "react";

import "./Square.css";

const Square = ({ isMovePossible, color, piece, onClick }) => {
  const style = {};
  if (isMovePossible) {
    style.border = "10px solid green";
  }
  if (piece && isMovePossible) {
    style.border = "10px solid crimson";
  }
  return (
    <div className={`square ${color}`} onClick={onClick}>
      <div className="move-possible" style={style} />
      {piece && <img width={80} height={80} src={piece.image} />}
    </div>
  );
};

export default Square;
