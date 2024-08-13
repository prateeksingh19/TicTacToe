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
    <div className="">
      <div>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          name=""
          id=""
        />
      </div>
      <div>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </div>
  );
}
