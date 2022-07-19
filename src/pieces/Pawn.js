import Piece from "./Piece";
import BlackPawn from "../assets/pieces/bP.png"
import WhitePawn from "../assets/pieces/wP.png"

export default class Pawn extends Piece {
  constructor(x, y, team) {
    super(x, y, team)
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
    if (pieces.find(piece => piece.position.y === this.position.y + num && piece.position.x === this.position.x)) {
      return false
    }
    else return true
  }

  _isAttackPossible = (pieces, numX, numY) => {
    return (pieces.find(piece => piece.position.y === this.position.y + numY && piece.position.x === this.position.x + numX && piece.team !== this.team))
  }

  getPossibleMoves = (pieces) => {
    const {x, y} = this.position
    const result = [];
    if (this.team === "black") {
      if (this._isForwardMovePossible(pieces, 1)) {
        result.push({x: x, y: y + 1})
        if (this._isForwardMovePossible(pieces, 2) && y === 1) {
          result.push({x: x, y: y + 2})
        }
      }
      if(this._isAttackPossible(pieces, 1, 1)) {
        result.push({x: x + 1, y: y + 1})
      }
      if(this._isAttackPossible(pieces, -1, 1)) {
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
      if(this._isAttackPossible(pieces, 1, -1)) {
        result.push({x: x + 1, y: y - 1})
      }
      if(this._isAttackPossible(pieces, -1, -1)) {
        result.push({x: x - 1, y: y - 1})
      }
      return result;
    }
  }
}
