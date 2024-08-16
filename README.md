# Tic-Tac-Toe Game

This is a single player Tic-Tac-Toe game built with Next.js, TypeScript The game allows players to compete against AI or against another player, from the same computer. It includes features such as game state management, leaderboards, and responsive design.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Play Tic-Tac-Toe against an AI opponent
- Simple and intuitive user interface
- Responsive design for various screen sizes

## Installation

### Prerequisites

- Node.js
- npm or yarn
- A modern web browser

To get started with the Tic-Tac-Toe game, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/prateeksingh19/TicTacToe
   cd tic-tac-toe
   ```

2. **Install dependencies:**

   Ensure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

3. **Build the game:**

   ```bash
   npm build
   ```

4. **Start the game:**

   ```bash
   npm start
   ```

   The game should now be running on `http://localhost:3000`.

## Usage

To play the game:

1. Open your web browser and navigate to `http://localhost:3000`.
2. Enter your name on the title screen and click "Start Game" to begin.
3. Make your moves by clicking on the empty cells in the grid.
4. The AI opponent will make its move automatically after yours.
5. The game will announce the winner or a draw when the game ends.

## Game Rules

- The game is played on a 3x3 grid.
- Players alternate turns, with the player using 'X' going first.
- The player who places three of their marks in a horizontal, vertical, or diagonal row wins.
- If all cells are filled and no player has won, the game is a draw.

## Technologies Used

- **Next**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Tailwind**: For styling the application.
- **SQLite**: For storing user's data.

## Game Features

- **Game Mode**: Can play vs AI or vs human with a simple click of a button.
- **Regular Data Update**: After every match ends, the leaderboard gets updated with the new score.

## API Endpoints

Written under app/api/route.ts

- **Get/api**: Gets the data of all users or user with specified id.
- **Post/api**: Registers a new user in the database.
- **Put/api**: Updates the score of the user with the specified id.

## Axios Requests

Written under app/lib/actions/

- **getUserData**: Fetches the data of all users or user with specified id from the database.
- **updateUserStats**: Updates the data of the user with specified id.

## Game Logic

Written under components/gameLogic.tsx

- **winningLogic**: Checks if someone has won the game or not.
- **playerMove**: Registers the user's move.
- **randomAIMove**: Registers AI move if playing against AI.

## Game Mode

User can switch between playing against AI or another player by clicking "Play Against AI" button after starting the game.

## Table Creation

"setupDatabase.mjs" runs before every game start to check if "user" table exists in the database or not. If not, it creates a "user" table in the database with name, win, loss, draw fields.
