"use client";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Board from "@/components/board";
import Leaderboard from "@/components/leaderboard";
import AppBar from "@/components/appbar";

export type User = {
  id: number;
  name: string;
  win: number;
  loss: number;
  draw: number;
};

export default function Game() {
  const [users, setUsers] = useState<User[]>([]);

  // fetches latest user data from the database to show in the leaderboard table
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

  // runs when the app is started
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="">
      <AppBar />
      <div className="h-screen bg-[#F7EFE5] lg:overflow-hidden">
        <div className="flex flex-col lg:h-2/3 gap-y-4 lg:gap-x-80 items-center lg:flex-row lg:justify-center ">
          <Suspense fallback={<div>Loading...</div>}>
            <Board onReset={fetchLeaderboardData} />
          </Suspense>
          <Leaderboard users={users} />
        </div>
      </div>
    </div>
  );
}
