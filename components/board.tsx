import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import getUserData from "@/app/lib/actions/getUserData";
import updateUserStats from "@/app/lib/actions/updateUserData";
import { winningLogic, playerMove } from "./gameLogic";
import Square from "./square";
import Congratulations from "./congratulation";

type BoardProps = {
  onReset: () => void;
};

export default function Board({ onReset }: BoardProps) {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [playAI, setPlayAI] = useState(true);
  const [lock, setLock] = useState(false);
  const [gameStats, setGameStats] = useState({ win: 0, loss: 0, draw: 0 });
  const [gameOutcome, setGameOutcome] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then((user) => {
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
      const updatedStats = { ...gameStats };
      updateUserStats(userId, updatedStats)
        .then(() => {
          onReset();
        })
        .catch((error) => console.error("Error updating user:", error));
    }
  }, [gameOutcome, userId]);

  const winner = winningLogic(board);
  const isDraw = !winner && board.every((value) => value !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw"
    : `Next player: ${xTurn ? "X" : "O"}`;

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
    <div className="">
      <div className="m-4 flex justify-center">
        <div className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-300">
          {status}
        </div>
      </div>
      {playAI && (
        <div className="m-4 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() => setPlayAI(false)}
          >
            Play without AI
          </button>
        </div>
      )}
      <div className="relative">
        <div className="grid grid-cols-3">
          {board.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() =>
                !lock &&
                playerMove(
                  index,
                  board,
                  xTurn,
                  winner,
                  setBoard,
                  setXTurn,
                  setLock,
                  playAI
                )
              }
            />
          ))}
        </div>
        {gameOutcome && (
          <Congratulations
            message={
              gameOutcome === "win"
                ? "Congratulations, you won!"
                : gameOutcome === "loss"
                ? "Sorry, you lost!"
                : "It's a draw!"
            }
          />
        )}
      </div>
      <div className="m-4 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={() => {
            setXTurn(true);
            setPlayAI(true);
            setBoard(Array(9).fill(null));
            setGameOutcome(null);
            setLock(false);
            onReset();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
