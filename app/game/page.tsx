"use client";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Board from "@/components/board";
import Leaderboard from "@/components/leaderboard";

export type User = {
  id: number;
  name: string;
  win: number;
  loss: number;
  draw: number;
};

export default function Game() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchLeaderboardData = () => {
    axios
      .get<User[]>("/api")
      .then((response) => {
        const sortedUsers = response.data.sort(
          (a: User, b: User) => b.win - a.win
        );
        setUsers(sortedUsers);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="flex flex-col h-[1174px] gap-y-4 lg:gap-x-80 items-center lg:flex-row lg:justify-center bg-[#F7EFE5]">
      <Suspense fallback={<div>Loading...</div>}>
        <Board onReset={fetchLeaderboardData} />
      </Suspense>
      <Leaderboard users={users} />
    </div>
  );
}
