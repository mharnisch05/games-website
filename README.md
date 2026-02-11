# 🎮 Fun Games Hub

A colorful, interactive games website featuring multiple classic games built with React and Vite. Similar to Cool Math Games and Addicting Games!

## Live Demo

🔗 **[Play Now on Vercel!](https://games-website-gamma.vercel.app)**

## Games Included

### 1. 🐍 Snake Game
- Classic snake gameplay
- Use arrow keys to control the snake
- Eat the red food to grow and increase your score
- Avoid hitting the walls or yourself
- Real-time score tracking

### 2. ⭕ Tic Tac Toe
- Play against another player (PvP mode)
- Play against an intelligent AI opponent
- AI uses strategic moves to win or block
- Beautiful interactive board with winning state detection
- Instant game result feedback

### 3. 2️⃣ 2048
- Classic number puzzle game
- Use arrow keys to slide tiles
- Combine tiles with the same number to reach 2048
- Score tracking with every successful merge
- Smooth animations and colorful tiles

### 4. 🐦 Flappy Bird
- Endless runner game with increasing difficulty
- Press SPACE or click to jump
- Avoid the green pipes
- Collect points by passing through gaps
- Simple but addictive gameplay

## Features

✨ **Beautiful UI**
- Gradient backgrounds with vibrant colors
- Smooth animations and transitions
- Responsive design (works on desktop and tablet)
- Clean, intuitive game layouts

🎯 **Fully Functional Games**
- All games are completely playable
- Score tracking for competitive play
- Game over and win state handling
- Reset/play again functionality

⚡ **Performance**
- Built with Vite for fast development and build times
- Optimized React components
- Minimal bundle size (~204KB total, 64KB gzipped)

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and development server
- **CSS3** - Styling with gradients and animations
- **Canvas API** - For Flappy Bird rendering
- **JavaScript ES6+** - Game logic

## Project Structure

```
src/
├── App.jsx              # Main app component with navigation
├── App.css              # Global styles and home page
├── games/
│   ├── SnakeGame.jsx    # Snake game component
│   ├── SnakeGame.css
│   ├── TicTacToe.jsx    # Tic Tac Toe component
│   ├── TicTacToe.css
│   ├── Game2048.jsx     # 2048 game component
│   ├── Game2048.css
│   ├── FlappyBird.jsx   # Flappy Bird component
│   └── FlappyBird.css
├── main.jsx             # React entry point
└── index.css            # Base styles
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mharnisch05/games-website.git
cd games-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project is deployed on **Vercel** and automatically updates when you push to the GitHub main branch.

**GitHub Repository**: https://github.com/mharnisch05/games-website
**Live Site**: https://games-website-gamma.vercel.app

## Game Controls

| Game | Controls |
|------|----------|
| Snake | Arrow Keys |
| Tic Tac Toe | Mouse Click |
| 2048 | Arrow Keys |
| Flappy Bird | SPACE / Click |

## Future Enhancements

Potential features to add:
- High score leaderboard
- Game difficulty levels
- More games (Tetris, Breakout, Pacman, etc.)
- Sound effects and music
- Dark/Light theme toggle
- Mobile touch controls optimization
- Multiplayer online games

## Performance Metrics

- Build Size: 0.46 kB (HTML), 9.95 kB (CSS), 204 kB (JS)
- Gzipped: 64.37 KB (JavaScript)
- Build Time: ~1.3 seconds
- Load Time: Optimized for fast loading

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.

## Author

Created with ❤️ using React and Vite

---

**Have fun playing! 🎯**

If you enjoy these games, feel free to ⭐ star the repository and share it with friends!
