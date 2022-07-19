import React from "react";

import Square from "./Square";
import "./Board.css";
import Pawn from "../../pieces/Pawn";
import Rook from "../../pieces/Rook";
import King from "../../pieces/King";
import Knight from "../../pieces/Knight";
import Bishop from "../../pieces/Bishop";

class Board extends React.Component {
  state = {
    pieces: [
      new Pawn(1, 1, "black"),
      new Rook(3, 6, "black"),
      new Rook(3, 3, "black"),
      new Bishop(6, 6, "white"),
      new Bishop(4, 3, "white"),
      new Knight(6, 5, "white"),
    ],
    possibleMoves: [],
    currentTeam: "",
  };

  createSquareClickHandler = (selectedPiece) => () => {
    if (selectedPiece) {
      const moves = selectedPiece.getPossibleMoves(this.state.pieces);
      this.setState({ possibleMoves: moves, currentTeam: selectedPiece.team });
      console.log("Square Selected", moves);
    } else {
      this.setState({ possibleMoves: [], currentTeam: "" });
      console.log("Square UnSelected");
    }
  };

  renderBoard = () => {
    const result = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const selectedPiece = this.state.pieces.find(
          (piece) => piece.position.x === i && piece.position.y === j
        );
        const isMovePossible = this.state.possibleMoves.find(
          (piece) => piece.x === i && piece.y === j
        );
        const clickHandler = this.createSquareClickHandler(selectedPiece);

        result.push(
          <Square
            key={`piece__${i}__${j}`}
            isMovePossible={isMovePossible}
            piece={selectedPiece}
            color={(i + j) % 2 ? "black" : "white"}
            onClick={clickHandler}
          />
        );
      }
    }
    return result;
  };

  render() {
    return <div className="board">{this.renderBoard()}</div>;
  }
}

export default Board;

// {`{ x: ${value.x}, y: ${value.y} }`}
