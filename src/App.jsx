import { useState } from 'react'
import './App.css'
import SnakeGame from './games/SnakeGame'
import TicTacToe from './games/TicTacToe'
import Game2048 from './games/Game2048'
import FlappyBird from './games/FlappyBird'

export default function App() {
  const [currentGame, setCurrentGame] = useState('home')

  const games = [
    { id: 'snake', name: '🐍 Snake', component: SnakeGame },
    { id: 'tictactoe', name: '⭕ Tic Tac Toe', component: TicTacToe },
    { id: '2048', name: '2️⃣ 2048', component: Game2048 },
    { id: 'flappy', name: '🐦 Flappy Bird', component: FlappyBird },
  ]

  const CurrentGame = games.find(g => g.id === currentGame)?.component

  return (
    <div className="app">
      <header className="header">
        <h1>🎮 Fun Games Hub</h1>
        <p>Play awesome games in your browser!</p>
      </header>

      {currentGame === 'home' ? (
        <div className="home">
          <div className="games-grid">
            {games.map(game => (
              <button
                key={game.id}
                className="game-card"
                onClick={() => setCurrentGame(game.id)}
              >
                <div className="game-title">{game.name}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-container">
          <button className="back-button" onClick={() => setCurrentGame('home')}>
            ← Back to Home
          </button>
          {CurrentGame && <CurrentGame />}
        </div>
      )}

      <footer className="footer">
        <p>🎯 Have fun! Made with ❤️</p>
      </footer>
    </div>
  )
}
