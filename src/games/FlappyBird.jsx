import { useState, useEffect, useRef, useCallback } from 'react'
import './FlappyBird.css'

export default function FlappyBird() {
  const canvasRef = useRef(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const gameStateRef = useRef({
    birdY: 150,
    birdX: 50,
    velocity: 0,
    pipes: [],
    score: 0,
    gameOver: false,
    pipeCounter: 0,
  })

  const CANVAS_WIDTH = 400
  const CANVAS_HEIGHT = 400
  const BIRD_SIZE = 20
  const GRAVITY = 0.5
  const JUMP_STRENGTH = -12
  const PIPE_WIDTH = 60
  const PIPE_GAP = 120
  const PIPE_SPEED = 4

  const handleJump = useCallback(() => {
    if (!gameStarted || gameStateRef.current.gameOver) return
    gameStateRef.current.velocity = JUMP_STRENGTH
  }, [gameStarted])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (!gameStarted) {
          setGameStarted(true)
          setScore(0)
          gameStateRef.current = {
            birdY: 150,
            birdX: 50,
            velocity: 0,
            pipes: [],
            score: 0,
            gameOver: false,
            pipeCounter: 0,
          }
        } else {
          handleJump()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, handleJump])

  useEffect(() => {
    if (!gameStarted) return

    const gameState = gameStateRef.current
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId

    const gameLoop = () => {
      // Update bird
      gameState.velocity += GRAVITY
      gameState.birdY += gameState.velocity

      // Update pipes
      gameState.pipeCounter++
      if (gameState.pipeCounter > 100) {
        const topPipeHeight = Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 60) + 30
        gameState.pipes.push({
          x: CANVAS_WIDTH,
          topHeight: topPipeHeight,
          scored: false,
        })
        gameState.pipeCounter = 0
      }

      gameState.pipes = gameState.pipes.filter((pipe) => {
        pipe.x -= PIPE_SPEED
        return pipe.x > -PIPE_WIDTH
      })

      // Check scoring
      gameState.pipes.forEach((pipe) => {
        if (!pipe.scored && pipe.x + PIPE_WIDTH < gameState.birdX) {
          gameState.score++
          setScore(gameState.score)
          pipe.scored = true
        }
      })

      // Check collisions
      if (gameState.birdY < 0 || gameState.birdY + BIRD_SIZE > CANVAS_HEIGHT) {
        gameState.gameOver = true
      }

      gameState.pipes.forEach((pipe) => {
        if (
          gameState.birdX < pipe.x + PIPE_WIDTH &&
          gameState.birdX + BIRD_SIZE > pipe.x
        ) {
          if (
            gameState.birdY < pipe.topHeight ||
            gameState.birdY + BIRD_SIZE > pipe.topHeight + PIPE_GAP
          ) {
            gameState.gameOver = true
          }
        }
      })

      // Draw
      ctx.fillStyle = '#667eea'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Draw pipes
      ctx.fillStyle = '#4ecca3'
      gameState.pipes.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight)
        ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, CANVAS_HEIGHT)
      })

      // Draw bird
      ctx.fillStyle = '#ffd700'
      ctx.beginPath()
      ctx.arc(gameState.birdX, gameState.birdY, BIRD_SIZE / 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw score
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 20px Arial'
      ctx.fillText(`Score: ${gameState.score}`, 10, 30)

      if (!gameState.gameOver) {
        animationId = requestAnimationFrame(gameLoop)
      }
    }

    animationId = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(animationId)
  }, [gameStarted])

  const resetGame = () => {
    setGameStarted(true)
    setScore(0)
    gameStateRef.current = {
      birdY: 150,
      birdX: 50,
      velocity: 0,
      pipes: [],
      score: 0,
      gameOver: false,
      pipeCounter: 0,
    }
  }

  const isGameOver = gameStateRef.current.gameOver && gameStarted

  return (
    <div className="flappy-bird">
      <h2>🐦 Flappy Bird</h2>

      <div className="score-display">Score: <span>{score}</span></div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleJump}
        className="game-canvas"
      />

      {!gameStarted && (
        <button className="start-button" onClick={resetGame}>
          Start Game
        </button>
      )}

      {isGameOver && (
        <div className="game-over-modal">
          <h3>Game Over!</h3>
          <p>Final Score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      <p className="controls">Press SPACE or Click to Jump</p>
    </div>
  )
}
