import Piece from "./Piece";
import BlackRook from "../assets/pieces/blackRook.png"
import WhiteRook from "../assets/pieces/whiteRook.png"

export default class Rook extends Piece {
  constructor(x, y, team) {
    super(x, y, team)
    this.position.x = x;
    this.position.y = y;
    this.team = team;

    if (team === "white") {
      this.image = WhiteRook;
    }
    if (team === "black") {
      this.image = BlackRook;
    }
  }
  
  getStraightMoves = (moves, pieces, directionX, directionY) => {
    const { x, y } = this.position;

    for (let step = 1; step < 9; step++) {
      const move = {
        x: x + directionX * step,
        y: y + directionY * step,
      };
      const foundPiece = pieces.find(piece => (
        piece.position.x === move.x && piece.position.y === move.y
      ));

      if (foundPiece) {
        if (foundPiece.team !== this.team) {
          moves.push(move);
        }
        break;
      } else {
        moves.push(move);
      }
    }
  }

  getPossibleMoves = (pieces) => {
    const moves = [];

    this.getStraightMoves(moves, pieces, 1, 0);
    this.getStraightMoves(moves, pieces, -1, 0);
    this.getStraightMoves(moves, pieces, 0, 1);
    this.getStraightMoves(moves, pieces, 0, -1);

    return moves.filter(move => move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8);
  }
}