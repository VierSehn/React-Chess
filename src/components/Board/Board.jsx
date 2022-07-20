import React from "react";

import Square from "./Square";
import SquareIdentifier from "./SquareIdentifier";
import "./Board.css";
import createInitialPieces from "../../createInitialPieces";

const A_BYTE_REPRESENTATION = "A".charCodeAt(0);

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
    pieces: createInitialPieces(),
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
      result.push(
        <SquareIdentifier>
          {8 - j}
        </SquareIdentifier>
      )
    }

    return [
      ...result,
      ...Array(8).fill(null).map((_, i) => (
        <SquareIdentifier>
          {String.fromCharCode(A_BYTE_REPRESENTATION + i)}
        </SquareIdentifier>
      )),
    ];
  };

  render() {
    return (
      <div className="board">
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
