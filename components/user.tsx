"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  return (
    <div className="flex flex-col justify-center items-center bg-[#F7EFE5]">
      <div className="">
        <div className="m-4">Enter your name</div>
        <input
          className="p-2 rounded-lg"
          placeholder="John"
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          name=""
          id=""
        />
        <div className="m-4">
          <button
            className="bg-blue-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
