import { User } from "@/app/game/page";

type LeaderboardProps = {
  users: User[];
};

export default function Leaderboard({ users }: LeaderboardProps) {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-r border-gray-300">Name</th>
            <th className="py-2 px-4 border-r border-gray-300">Wins</th>
            <th className="py-2 px-4 border-r border-gray-300">Losses</th>
            <th className="py-2 px-4">Draws</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-300">
              <td className="py-2 px-4 border-r border-gray-300">
                {user.name}
              </td>
              <td className="py-2 px-4 border-r border-gray-300">{user.win}</td>
              <td className="py-2 px-4 border-r border-gray-300">
                {user.loss}
              </td>
              <td className="py-2 px-4">{user.draw}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
