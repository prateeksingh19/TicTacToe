"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function User() {
  const [name, setName] = useState("");
  const router = useRouter();

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
        <button
          onClick={() => {
            axios.post("/", name);
            router.push("/game");
          }}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
