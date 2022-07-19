import Piece from "./Piece";
import BlackRook from "../assets/pieces/bR.png"
import WhiteRook from "../assets/pieces/wR.png"

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
  
  getPossibleMoves = (pieces) => {
    const result = [];
    const {x, y} = this.position
    const maxMoves = Math.max(8 - x, 8 - y, x, y)
    for (let i = 1; i <= maxMoves; i++) {
      if (y + i < 8) {
          result.push({x: x, y: y + i})
      }
      if (y - i >= 0) {
        result.push({x: x, y: y - i})
      }
      if (x + i < 8) {
        result.push({x: x + i, y: y})
      }
      if (x - i >= 0) {
        result.push({x: x - i, y: y})
      }
    }
    return result;
  }
}