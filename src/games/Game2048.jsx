import { useState, useEffect, useCallback } from 'react'
import './Game2048.css'

const GRID_SIZE = 4

export default function Game2048() {
  const [board, setBoard] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const createNewBoard = useCallback(() => {
    const newBoard = Array(GRID_SIZE * GRID_SIZE).fill(0)
    newBoard[Math.floor(Math.random() * newBoard.length)] = 2
    newBoard[Math.floor(Math.random() * newBoard.length)] = 2
    return newBoard
  }, [])

  const initializeGame = useCallback(() => {
    const newBoard = createNewBoard()
    setBoard(newBoard)
    setScore(0)
    setGameOver(false)
    setGameWon(false)
    setGameStarted(true)
  }, [createNewBoard])

  useEffect(() => {
    if (!gameStarted) return
  }, [gameStarted])

  const addNewTile = (currentBoard) => {
    const emptyCells = currentBoard
      .map((val, index) => (val === 0 ? index : null))
      .filter((val) => val !== null)

    if (emptyCells.length === 0) return currentBoard

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    const newBoard = [...currentBoard]
    newBoard[randomIndex] = Math.random() < 0.9 ? 2 : 4
    return newBoard
  }

  const move = useCallback(
    (direction) => {
      if (!gameStarted || gameOver || gameWon) return

      let newBoard = [...board]
      let moved = false
      let newScore = score

      const rotateClockwise = (arr) => {
        const grid = []
        for (let i = 0; i < GRID_SIZE; i++) {
          grid.push([])
          for (let j = 0; j < GRID_SIZE; j++) {
            grid[i].push(arr[i * GRID_SIZE + j])
          }
        }
        return grid.flat().map((_, i) => grid[i % GRID_SIZE][Math.floor(i / GRID_SIZE)])
      }

      const slideAndMerge = (row) => {
        const filtered = row.filter((val) => val !== 0)
        const merged = []
        let i = 0
        while (i < filtered.length) {
          if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
            merged.push(filtered[i] * 2)
            newScore += filtered[i] * 2
            i += 2
          } else {
            merged.push(filtered[i])
            i++
          }
        }
        return [...merged, ...Array(GRID_SIZE - merged.length).fill(0)]
      }

      // Apply transformations based on direction
      for (let i = 0; i < GRID_SIZE; i++) {
        const row = []
        for (let j = 0; j < GRID_SIZE; j++) {
          if (direction === 'LEFT') row.push(newBoard[i * GRID_SIZE + j])
          else if (direction === 'RIGHT') row.unshift(newBoard[i * GRID_SIZE + j])
          else if (direction === 'UP') row.push(newBoard[j * GRID_SIZE + i])
          else if (direction === 'DOWN') row.unshift(newBoard[j * GRID_SIZE + i])
        }

        const newRow = slideAndMerge(row)
        for (let j = 0; j < GRID_SIZE; j++) {
          const newVal =
            direction === 'LEFT'
              ? newRow[j]
              : direction === 'RIGHT'
              ? newRow[GRID_SIZE - 1 - j]
              : direction === 'UP'
              ? newRow[j]
              : newRow[GRID_SIZE - 1 - j]

          const oldVal =
            direction === 'LEFT' || direction === 'RIGHT'
              ? board[i * GRID_SIZE + j]
              : board[j * GRID_SIZE + i]

          if (newVal !== oldVal) moved = true

          if (direction === 'LEFT' || direction === 'RIGHT')
            newBoard[i * GRID_SIZE + j] = newVal
          else newBoard[j * GRID_SIZE + i] = newVal
        }
      }

      if (!moved) return

      const boardWithTile = addNewTile(newBoard)
      setBoard(boardWithTile)
      setScore(newScore)

      if (boardWithTile.includes(2048)) {
        setGameWon(true)
      }

      if (!canMove(boardWithTile)) {
        setGameOver(true)
      }
    },
    [board, gameStarted, gameOver, gameWon, score]
  )

  const canMove = (currentBoard) => {
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === 0) return true
    }

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const index = i * GRID_SIZE + j
        const right = j < GRID_SIZE - 1 ? currentBoard[index + 1] : null
        const down = i < GRID_SIZE - 1 ? currentBoard[index + GRID_SIZE] : null

        if (right && currentBoard[index] === right) return true
        if (down && currentBoard[index] === down) return true
      }
    }
    return false
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          move('LEFT')
          break
        case 'ArrowRight':
          e.preventDefault()
          move('RIGHT')
          break
        case 'ArrowUp':
          e.preventDefault()
          move('UP')
          break
        case 'ArrowDown':
          e.preventDefault()
          move('DOWN')
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [move, gameStarted])

  const getTileColor = (value) => {
    const colors = {
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    }
    return colors[value] || '#cdc1b4'
  }

  return (
    <div className="game-2048">
      <h2>2️⃣ 2048</h2>

      <div className="score-board">
        <div className="score">
          <p>Score</p>
          <h3>{score}</h3>
        </div>
      </div>

      {!gameStarted ? (
        <button className="start-button" onClick={initializeGame}>
          Start Game
        </button>
      ) : (
        <>
          <div className="board-2048">
            {board.map((value, index) => (
              <div
                key={index}
                className="tile"
                style={{
                  backgroundColor: value ? getTileColor(value) : '#cdc1b4',
                  color: value > 4 ? '#f9f6f2' : '#776e65',
                }}
              >
                {value > 0 && <span>{value}</span>}
              </div>
            ))}
          </div>

          <p className="instructions">Use arrow keys to move tiles</p>

          {gameWon && (
            <div className="modal">
              <h3>🎉 You Won!</h3>
              <p>You reached 2048!</p>
              <button onClick={initializeGame}>Play Again</button>
            </div>
          )}

          {gameOver && (
            <div className="modal">
              <h3>Game Over!</h3>
              <p>Final Score: {score}</p>
              <button onClick={initializeGame}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
