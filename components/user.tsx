"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AppBar from "./appbar";

export default function User() {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  async function handleStartGame() {
    try {
      const response = await axios.post("/api", { name });
      const { id } = response.data;
      router.push(`/game?id=${id}`);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleStartGame();
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#F7EFE5]">
      <div className="h-2/3 lg:h-1/2">
        <div className="w-full max-w-md px-4">
          <div className="mb-4 text-xl text-center">Enter your name</div>
          <input
            className="w-full p-2 mb-4 rounded-lg text-center"
            placeholder="John"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
          />
          <button
            className="w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
