import React from "react"

import Board from "./Board"
import createInitialBoard from "./createInitialBoard"

class App extends React.Component {
  state = {
    board: createInitialBoard()
  }

  render() {
    return (
      <Board board={this.state.board}/>
    )
  }
}
  
export default App;
