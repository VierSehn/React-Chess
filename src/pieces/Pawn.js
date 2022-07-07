import Piece from "./Piece";
import BlackPawn from "../assets/pieces/bP.png"
import WhitePawn from "../assets/pieces/wP.png"

export default class Pawn extends Piece {
  constructor(x, y, team) {
    this.position.x = x;
    this.position.y = y;
    this.team = team;

    if (team === "white") {
      this.image = WhitePawn;
    }
    if (team === "black") {
      this.image = BlackPawn;
    }
  }
  
  canPawnMove = (pieces, num) => {
    if (pieces.find(piece => piece.position.y !== y + num && piece.position.x !== x)){
      return true;
    }
  }

  canPawnBeat = (pieces, numX, numY) => {
    if (pieces.find(piece => piece.position.y !== y + numY && piece.position.x !== x + numX)){
      return true;
    }
  }

  getPossibleMoves = (pieces) => {
    const { x, y } = this.position;
    const result = [];
    if (this.team === "black") {
      if (canPawnMove(pieces, 1)) {
        result.push({x: x, y: y + 1})
        if (canPawnMove(pieces, 2) && y === 6) {
          result.push({x: x, y: y + 2})
        }
      }
      if(this.canPawnBeat(pieces, 1, 1)) {
        result.push({x: x + 1, y: y + 1})
      }
      if(this.canPawnBeat(pieces, -1, 1)) {
        result.push({x: x - 1, y: y + 1})
      }
    }
  }
}
