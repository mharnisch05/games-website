import { useState, useEffect, useCallback } from 'react'
import './SnakeGame.css'

const GRID_WIDTH = 20
const GRID_HEIGHT = 20
const CELL_SIZE = 20

export default function SnakeGame() {
  const [snake, setSnake] = useState([[10, 10]])
  const [food, setFood] = useState([15, 15])
  const [direction, setDirection] = useState([1, 0])
  const [nextDirection, setNextDirection] = useState([1, 0])
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const generateFood = useCallback((snakeBody) => {
    let newFood
    let isOnSnake = true
    while (isOnSnake) {
      newFood = [
        Math.floor(Math.random() * GRID_WIDTH),
        Math.floor(Math.random() * GRID_HEIGHT),
      ]
      isOnSnake = snakeBody.some(
        (segment) => segment[0] === newFood[0] && segment[1] === newFood[1]
      )
    }
    return newFood
  }, [])

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake]
      const head = [...newSnake[newSnake.length - 1]]
      
      setDirection(nextDirection)
      head[0] += nextDirection[0]
      head[1] += nextDirection[1]

      // Check collisions with walls
      if (
        head[0] < 0 ||
        head[0] >= GRID_WIDTH ||
        head[1] < 0 ||
        head[1] >= GRID_HEIGHT
      ) {
        setGameOver(true)
        return prevSnake
      }

      // Check collisions with self
      if (newSnake.some((segment) => segment[0] === head[0] && segment[1] === head[1])) {
        setGameOver(true)
        return prevSnake
      }

      newSnake.push(head)

      // Check if food is eaten
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore((prev) => prev + 10)
        setFood(generateFood(newSnake))
      } else {
        newSnake.shift()
      }

      return newSnake
    })
  }, [nextDirection, food, generateFood])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(moveSnake, 150)
    return () => clearInterval(interval)
  }, [moveSnake, gameStarted, gameOver])

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction[1] === 0) setNextDirection([0, -1])
          break
        case 'ArrowDown':
          if (direction[1] === 0) setNextDirection([0, 1])
          break
        case 'ArrowLeft':
          if (direction[0] === 0) setNextDirection([-1, 0])
          break
        case 'ArrowRight':
          if (direction[0] === 0) setNextDirection([1, 0])
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction])

  const resetGame = () => {
    setSnake([[10, 10]])
    setFood(generateFood([[10, 10]]))
    setDirection([1, 0])
    setNextDirection([1, 0])
    setGameOver(false)
    setScore(0)
    setGameStarted(true)
  }

  return (
    <div className="snake-game">
      <div className="game-info">
        <h2>🐍 Snake Game</h2>
        <p>Score: <span>{score}</span></p>
      </div>

      <div className="game-board">
        <div
          className="grid"
          style={{
            width: GRID_WIDTH * CELL_SIZE,
            height: GRID_HEIGHT * CELL_SIZE,
          }}
        >
          {/* Food */}
          <div
            className="food"
            style={{
              left: food[0] * CELL_SIZE,
              top: food[1] * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />

          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`snake-segment ${index === snake.length - 1 ? 'head' : ''}`}
              style={{
                left: segment[0] * CELL_SIZE,
                top: segment[1] * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
          ))}
        </div>
      </div>

      <div className="controls">
        <p>Use arrow keys to move the snake</p>
        {!gameStarted && (
          <button className="start-button" onClick={resetGame}>
            Start Game
          </button>
        )}
        {gameOver && (
          <div className="game-over">
            <h3>Game Over!</h3>
            <p>Final Score: {score}</p>
            <button className="restart-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
