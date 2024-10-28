import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import config from '@/config';
import { useWinStreakStore } from '@/store/usewinStreakStore';
import { Character } from '@/types/Character';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BattlePage() {
  const [characterOne, setCharacterOne] = useState<Character | null>(null);
  const [characterTwo, setCharacterTwo] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const winStreak = useWinStreakStore((state) => state.winStreak);
  const increaseWinStreak = useWinStreakStore(
    (state) => state.increaseWinStreak
  );
  const resetWinStreak = useWinStreakStore((state) => state.resetWinStreak);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    fetch(`${config.apiBaseUrl}/battle`)
      .then((response) => response.json())
      .then((data) => {
        setCharacterOne(data.characterOne);
        setCharacterTwo(data.characterTwo);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  };

  const handleVote = async (winnerId: string, loserId: string) => {
    fetch(`${config.apiBaseUrl}/battle/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        winnerId,
        loserId,
        currentStreak: winStreak,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.newStreak) {
          increaseWinStreak();
          fetchCharacters();
        } else if (data.characterId) {
          resetWinStreak();
          navigate(`/character/${data.characterId}`);
        }
      })
      .catch((error) => {
        console.error('Error submitting vote:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!(characterOne && characterTwo)) {
    return <div>Not enough characters to battle.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Who is hotter?</h2>
      <div className="flex justify-around">
        <Card
          onClick={() => handleVote(characterOne.id, characterTwo.id)}
          className="cursor-pointer w-64"
        >
          <CardHeader>
            <CardTitle className="text-center">{characterOne.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={characterOne.image_url}
              alt={characterOne.name}
              className="w-full h-auto rounded"
            />
          </CardContent>
        </Card>
        <Card
          onClick={() => handleVote(characterTwo.id, characterOne.id)}
          className="cursor-pointer w-64"
        >
          <CardHeader>
            <CardTitle className="text-center">{characterTwo.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={characterTwo.image_url}
              alt={characterTwo.name}
              className="w-full h-auto rounded"
            />
          </CardContent>
        </Card>
      </div>
      <div className="text-center mt-4">
        <p>Current Win Streak: {winStreak}</p>
      </div>
    </div>
  );
}

export default BattlePage;
