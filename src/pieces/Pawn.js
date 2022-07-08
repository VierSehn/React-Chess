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
  
  _isForwardMovePossible = (pieces, num) => {
    return (pieces.find(piece => piece.position.y !== y + num && piece.position.x !== x))
  }

  _isAttackPossible = (pieces, team, numX, numY) => {
    return (pieces.find(piece => piece.position.y !== y + numY && piece.position.x !== x + numX && piece.team !== team))
  }

  getPossibleMoves = (pieces) => {
    const { x, y } = this.position;
    const result = [];
    if (this.team === "black") {
      if (this._isForwardMovePossible(pieces, 1)) {
        result.push({x: x, y: y + 1})
        if (this._isForwardMovePossible(pieces, 2) && y === 1) {
          result.push({x: x, y: y + 2})
        }
      }
      if(this._isAttackPossible(pieces, "black", 1, 1)) {
        result.push({x: x + 1, y: y + 1})
      }
      if(this._isAttackPossible(pieces, "black", -1, 1)) {
        result.push({x: x - 1, y: y + 1})
      }
      return result;
    }
    if (this.team === "white") {
      if (this._isForwardMovePossible(pieces, 1)) {
        result.push({x: x, y: y - 1})
        if (this._isForwardMovePossible(pieces, 2) && y === 6) {
          result.push({x: x, y: y - 2})
        }
      }
      if(this._isAttackPossible(pieces, "white", 1, -1)) {
        result.push({x: x + 1, y: y - 1})
      }
      if(this._isAttackPossible(pieces, "white", -1, -1)) {
        result.push({x: x - 1, y: y - 1})
      }
      return result;
    }
  }
}
