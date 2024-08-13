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

export default function GameContainer() {
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
    <div className="flex flex-col h-fit md:h-screen gap-y-4 lg:gap-x-4 items-center lg:flex-row justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <Board onReset={fetchLeaderboardData} />
      </Suspense>
      <Leaderboard users={users} />
    </div>
  );
}
