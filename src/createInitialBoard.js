const createInitialBoard = () => {
  const result = []
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      result.push({
        x: i,
        y: j,
      })
    }
  }
  return result
}

export default createInitialBoard