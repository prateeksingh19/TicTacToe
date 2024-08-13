"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Square from "./square";
import { useSearchParams } from "next/navigation";

export default function Board() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [playAI, setPlayAI] = useState(true);
  const [lock, setLock] = useState(false);
  const [gameStats, setGameStats] = useState({
    win: 0,
    loss: 0,
    draw: 0,
  });
  const [gameOutcome, setGameOutcome] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api?id=${userId}`)
        .then((response) => {
          const user = response.data[0];
          setGameStats({
            win: user.win || 0,
            loss: user.loss || 0,
            draw: user.draw || 0,
          });
        })
        .catch((error) => console.error("Error fetching user stats:", error));
    }
  }, [userId]);

  useEffect(() => {
    if (gameOutcome && userId) {
      const updatedStats = {
        ...gameStats,
      };

      axios
        .put(`/api?id=${userId}`, updatedStats)
        .then()
        .catch((error) => console.error("Error updating user:", error));
    }
  }, [gameOutcome, userId]);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((value) => value !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw"
    : `Next player: ${xTurn ? "X" : "O"}`;

  function handlePlayerMove(index: number) {
    if (!lock) {
      setLock(true);
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

    if (calculateWinner(newBoard) === "O") {
      return;
    } else {
      setLock(false);
      setXTurn(true);
    }
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

  useEffect(() => {
    if (winner) {
      if (winner === "X") {
        setGameOutcome("win");
        setGameStats((prevStats) => ({
          ...prevStats,
          win: prevStats.win + 1,
        }));
      } else if (winner === "O") {
        setGameOutcome("loss");
        setGameStats((prevStats) => ({
          ...prevStats,
          loss: prevStats.loss + 1,
        }));
      }
    } else if (isDraw) {
      setGameOutcome("draw");
      setGameStats((prevStats) => ({
        ...prevStats,
        draw: prevStats.draw + 1,
      }));
    }
  }, [winner, isDraw]);

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
            setGameOutcome(null);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
