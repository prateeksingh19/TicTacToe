import { User } from "@/app/game/page";

type LeaderboardProps = {
  users: User[];
};

export default function Leaderboard({ users }: LeaderboardProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Leaderboard</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Wins</th>
            <th className="py-2 px-4 border-b">Losses</th>
            <th className="py-2 px-4 border-b">Draws</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.win}</td>
              <td className="py-2 px-4 border-b">{user.loss}</td>
              <td className="py-2 px-4 border-b">{user.draw}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
