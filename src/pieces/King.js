import Piece from "./Piece";
import BlackKing from "../assets/pieces/blackKing.png"
import WhiteKing from "../assets/pieces/whiteKing.png"

export default class King extends Piece {
  constructor(x, y, team) {
    super(x, y, team)
    this.position.x = x;
    this.position.y = y;
    this.team = team;

    if (team === "white") {
      this.image = WhiteKing;
    }
    if (team === "black") {
      this.image = BlackKing;
    }
  }
  
  getPossibleMoves = (pieces) => {
    const result = [];
    const {x, y} = this.position
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (pieces.find(piece => piece.position.x === i && piece.position.y === j && piece.team !== this.team)) {
          result.push({x: i, y: j});
          continue;
        }
        if (pieces.find(piece => piece.position.x === i && piece.position.y === j && piece.team === this.team)) {
          continue;
        }
        else result.push({x: i, y: j});
      }
    }
    return result;
  }
}