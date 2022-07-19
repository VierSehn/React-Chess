import Piece from "./Piece";
import BlackBishop from "../assets/pieces/bB.png"
import WhiteBishop from "../assets/pieces/wB.png"

export default class Bishop extends Piece {
  constructor(x, y, team) {
    super(x, y, team)
    this.position.x = x;
    this.position.y = y;
    this.team = team;

    if (team === "white") {
      this.image = WhiteBishop;
    }
    if (team === "black") {
      this.image = BlackBishop;
    }
  }

  _isAttackPossible = (pieces, step) => {
    const piece = pieces.find(({ position: { x, y } }) => (
      this.position.x + step === x && this.position.y + step === y
    ))
    return piece && piece.team === this.team
  }
  _isMovePossible = (pieces, step) => {
      if (pieces.find(({ position: { x, y } }) => (
        this.position.x + step === x && this.position.y + step === y
      )) === undefined) return true
  }

  getPossibleMoves = (pieces) => {
    const result = [];
    const {x, y} = this.position
    const maxMoves = Math.max(8 - x, 8 - y, x, y)
    for (let i = 1; i <= maxMoves; i++) {
      if (x + i < 8) {
        if (y + i < 8) {
          if (this._isAttackPossible(pieces, i) || this._isMovePossible(pieces, i)) {
            result.push({x: x + i, y: y + i})
          }
          else break;
        }
        if (y - i >= 0) {
          if (this._isAttackPossible(pieces, i) || this._isMovePossible(pieces, i)) {
          result.push({x: x + i, y: y - i})
          }
        }
      }
      if (x - i >= 0) {
        if (y + i < 8) {
          if (this._isAttackPossible(pieces, i) || this._isMovePossible(pieces, i)) {
          result.push({x: x - i, y: y + i})
          }
        }
        if (y - i >= 0) {
          if (this._isAttackPossible(pieces, i) || this._isMovePossible(pieces, i)) {
          result.push({x: x - i, y: y - i})
          }
        }
      }
    }
    return result;
  }
}