import Piece from "./Piece";
import BlackKnight from "../assets/pieces/bN.png"
import WhiteKnight from "../assets/pieces/wN.png"

export default class Knight extends Piece {
  constructor(x, y, team) {
    super(x, y, team)
    this.position.x = x;
    this.position.y = y;
    this.team = team;

    if (team === "white") {
      this.image = WhiteKnight;
    }
    if (team === "black") {
      this.image = BlackKnight;
    }
  }
  
  _moves = [
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
    { x: 1, y: 2 },
    { x: -1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
  ];

  _getKnightMove = (pieces, offsetX, offsetY) => {
    const {x, y} = this.position
    if (x + offsetX > 0 && x + offsetX < 8 && y + offsetY > 0 && y + offsetY < 8) {
      if (pieces.find(piece => piece.position.y === y + offsetY && piece.position.x === x + offsetX && piece.team !== this.team)) {
        return { x: x + offsetX, y: y + offsetY };
      }
      if (pieces.find(piece => piece.position.y === y + offsetY && piece.position.x === x + offsetX && piece.team === this.team)) {
        return null;
      }
      else return { x: x + offsetX, y: y + offsetY };
    }
  }

  getPossibleMoves = (pieces) => (
    this._moves
      .map(({ x, y }) => this._getKnightMove(pieces, x, y))
      .filter(move => move)
  )
}