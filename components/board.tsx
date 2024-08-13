"use client";
import { useCallback, useState } from "react";
import Square from "./square";

export default function Board() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [playAI, setPlayAI] = useState(true);
  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xTurn ? "X" : "O"}`;

  function handlePlayerMove(index: number) {
    if (board[index] || winner) return;

    const currentBoard = [...board];
    currentBoard[index] = xTurn ? "X" : "O";

    setBoard(currentBoard);
    setXTurn((prevXTurn) => {
      const nextXTurn = !prevXTurn;
      if (!nextXTurn && playAI) {
        setTimeout(() => randomAIMove(currentBoard), 500);
      }
      return nextXTurn;
    });
  }

  function randomAIMove(currentBoard: string[]) {
    const squaresLeft = currentBoard
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null) as number[];

    if (squaresLeft.length === 0 || calculateWinner(currentBoard)) return;

    const randomIndex =
      squaresLeft[Math.floor(Math.random() * squaresLeft.length)];

    const newBoard = [...currentBoard];
    newBoard[randomIndex] = "O";

    setBoard(newBoard);
    setXTurn(true);
  }

  function calculateWinner(board: string[]) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let lines of winningLines) {
      const [a, b, c] = lines;

      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
  return (
    <div className="w-80">
      <div className="m-4 flex justify-center">
        <div className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-300">
          {status}
        </div>
      </div>
      {playAI && (
        <div className="m-4 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() => {
              setPlayAI(false);
            }}
          >
            Play without AI
          </button>
        </div>
      )}
      <div className="grid grid-cols-3">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handlePlayerMove(index)}
          />
        ))}
      </div>
      <div className="m-4 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={() => {
            setXTurn(true);
            setPlayAI(true);
            setBoard(Array(9).fill(null));
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
