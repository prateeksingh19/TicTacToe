"use client";
import { useState } from "react";

export default function Square({ value }: { value: string }) {
  const [bool, setBool] = useState(true);
  return (
    <div className="m-2">
      <button
        className="w-24 h-24 bg-gray-200 border-2 border-black flex items-center justify-center text-4xl font-bold cursor-pointer hover:bg-gray-300 transition-colors"
        onClick={() => {
          setBool((prevValue) => !prevValue);
        }}
      >
        {bool ? "X" : "O"}
      </button>
    </div>
  );
}
