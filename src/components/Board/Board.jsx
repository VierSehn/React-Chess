import React from "react";

import Square from "./Square";
import "./Board.css";
import Pawn from "../../pieces/Pawn";
import Rook from "../../pieces/Rook";
import King from "../../pieces/King";
import Knight from "../../pieces/Knight";
import Bishop from "../../pieces/Bishop";
import Queen from "../../pieces/Queen";

const getOppositeTeam = (currentTeam) => {
  if (currentTeam === "white") {
    return "black";
  }

  if (currentTeam === "black") {
    return "white";
  }
};

class Board extends React.Component {
  state = {
    pieces: [
      new Rook(0, 0, "black"),
      new Knight(1, 0, "black"),
      new Bishop(2, 0, "black"),
      new Queen(3, 0, "black"),
      new King(4, 0, "black"),
      new Bishop(5, 0, "black"),
      new Knight(6, 0, "black"),
      new Rook(7, 0, "black"),
      new Pawn(0, 1, "black"),
      new Pawn(1, 1, "black"),
      new Pawn(2, 1, "black"),
      new Pawn(3, 1, "black"),
      new Pawn(4, 1, "black"),
      new Pawn(5, 1, "black"),
      new Pawn(6, 1, "black"),
      new Pawn(7, 1, "black"),
      new Rook(0, 7, "white"),
      new Knight(1, 7, "white"),
      new Bishop(2, 7, "white"),
      new Queen(3, 7, "white"),
      new King(4, 7, "white"),
      new Bishop(5, 7, "white"),
      new Knight(6, 7, "white"),
      new Rook(7, 7, "white"),
      new Pawn(0, 6, "white"),
      new Pawn(1, 6, "white"),
      new Pawn(2, 6, "white"),
      new Pawn(3, 6, "white"),
      new Pawn(4, 6, "white"),
      new Pawn(5, 6, "white"),
      new Pawn(6, 6, "white"),
      new Pawn(7, 6, "white"),
    ],
    selectedPiece: null,
    currentTeam: "white",
  };

  moveToSquare = (destination) => {
    const origin = this.state.selectedPiece.position;
    this.setState(({ pieces, currentTeam }) => ({
      pieces: pieces.map((piece) => {
        const { x, y } = piece.position;

        if (x === origin.x && y === origin.y) {
          piece.position = destination;
        }
        return piece;
      }),
      selectedPiece: null,
      currentTeam: getOppositeTeam(currentTeam),
    }));
  };

  attackAtSquare = (destination) => {
    this.setState(({ pieces }) => ({
      pieces: pieces.filter(
        ({ position }) =>
          position.x !== destination.x || position.y !== destination.y
      ),
    }));
    this.moveToSquare(destination);
  };

  createSquareClickHandler = (x, y) => () => {
    const { pieces, currentTeam, selectedPiece } = this.state;

    const piece = pieces.find(
      (piece) => piece.position.x === x && piece.position.y === y
    );

    if (piece && piece.team === currentTeam) {
      this.setState({ selectedPiece: piece });
      return;
    }

    if (selectedPiece) {
      const isMovePossible = selectedPiece
        .getPossibleMoves(this.state.pieces)
        .find((move) => move.x === x && move.y === y);

      if (isMovePossible) {
        if (!piece) {
          this.moveToSquare({ x, y });
          return;
        }
        if (piece.team !== currentTeam) {
          this.attackAtSquare({ x, y });
          return;
        }
      }
      this.setState({ selectedPiece: null });
      return;
    }
  };

  renderBoard = () => {
    const { pieces, selectedPiece } = this.state;
    const result = [];

    const possibleMoves = selectedPiece?.getPossibleMoves(pieces) || [];

    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 8; i++) {
        const foundPiece = pieces.find(
          (piece) => piece.position.x === i && piece.position.y === j
        );

        const isMovePossible = possibleMoves.find(
          (piece) => piece.x === i && piece.y === j
        );

        result.push(
          <Square
            key={`piece__${i}__${j}`}
            isMovePossible={isMovePossible}
            piece={foundPiece}
            color={(i + j) % 2 ? "black" : "white"}
            onClick={this.createSquareClickHandler(i, j)}
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
