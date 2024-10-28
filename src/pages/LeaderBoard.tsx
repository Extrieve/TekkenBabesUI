import config from '@/config';
import Leaderboard from '@/types/Leaderboard';
import { useEffect, useState } from 'react';

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/leaderboard`);
        const data = await response.json();
        setLeaderboard(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">Character</th>
            <th className="py-2 px-4 border-b">Total Wins</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((character, index) => (
            <tr key={character.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b">{character.name}</td>
              <td className="py-2 px-4 border-b text-center">
                {character.total_wins}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;
