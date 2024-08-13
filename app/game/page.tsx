import Board from "@/components/board";
import LeaderBoard from "@/components/leaderboard";

export default function Home() {
  return (
    <div className="flex">
      <Board />
      <LeaderBoard />
    </div>
  );
}
