import { useState } from 'react'
import './TicTacToe.css'

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameMode, setGameMode] = useState('pvp') // 'pvp' or 'ai'
  const [gameStarted, setGameStarted] = useState(false)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const getAIMove = (squares) => {
    // Check if AI can win
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        const testBoard = [...squares]
        testBoard[i] = 'O'
        if (calculateWinner(testBoard) === 'O') return i
      }
    }

    // Check if human can win, block them
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        const testBoard = [...squares]
        testBoard[i] = 'X'
        if (calculateWinner(testBoard) === 'X') return i
      }
    }

    // Take center
    if (!squares[4]) return 4

    // Take corners
    const corners = [0, 2, 6, 8].filter((i) => !squares[i])
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)]

    // Take any available
    const available = squares.map((val, i) => (val ? null : i)).filter((val) => val !== null)
    return available[Math.floor(Math.random() * available.length)]
  }

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || !gameStarted) return

    let newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)

    // Check if game ends after human move
    if (calculateWinner(newBoard) || newBoard.every((val) => val)) {
      return
    }

    // AI move (if single player)
    if (gameMode === 'ai') {
      setTimeout(() => {
        const aiMove = getAIMove(newBoard)
        newBoard[aiMove] = 'O'
        setBoard(newBoard)
        setIsXNext(true)
      }, 500)
    } else {
      setIsXNext(!isXNext)
    }
  }

  const winner = calculateWinner(board)
  const isBoardFull = board.every((val) => val)

  const getGameStatus = () => {
    if (winner) {
      if (gameMode === 'ai' && winner === 'O') return `🤖 AI Wins!`
      return `${winner === 'X' ? '🎉 You' : '🤖 AI'} Win!`
    }
    if (isBoardFull) return "It's a Draw!"
    if (gameMode === 'pvp') {
      return `Player ${isXNext ? 'X' : 'O'}'s Turn`
    }
    return `Your Turn (X)`
  }

  const resetGame = (newMode = gameMode) => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameMode(newMode)
    setGameStarted(true)
  }

  return (
    <div className="tictactoe">
      <h2>⭕ Tic Tac Toe</h2>

      {!gameStarted ? (
        <div className="mode-select">
          <p>Choose Game Mode:</p>
          <button onClick={() => resetGame('pvp')} className="mode-button">
            👥 Player vs Player
          </button>
          <button onClick={() => resetGame('ai')} className="mode-button">
            🤖 vs AI
          </button>
        </div>
      ) : (
        <>
          <div className="status">{getGameStatus()}</div>

          <div className="board">
            {board.map((value, index) => (
              <button
                key={index}
                className={`cell ${value} ${
                  winner && calculateWinner(board.map((v, i) => (i === index ? value : v))) ? 'winning' : ''
                }`}
                onClick={() => handleClick(index)}
              >
                {value}
              </button>
            ))}
          </div>

          {(winner || isBoardFull) && (
            <div className="game-result">
              {winner ? (
                <h3>
                  {gameMode === 'ai' && winner === 'O' ? '🤖 AI' : `🎉 ${winner}`} Wins!
                </h3>
              ) : (
                <h3>🤝 It's a Draw!</h3>
              )}
              <button onClick={() => resetGame()} className="play-again-button">
                Play Again
              </button>
            </div>
          )}

          {gameStarted && !winner && !isBoardFull && (
            <button onClick={() => setGameStarted(false)} className="back-mode-button">
              Change Mode
            </button>
          )}
        </>
      )}
    </div>
  )
}
