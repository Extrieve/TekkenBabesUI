import config from '@/config';
import { Character } from '@/types/Character';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BattlePage() {
  const [characterOne, setCharacterOne] = useState<Character | null>(null);
  const [characterTwo, setCharacterTwo] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [winStreak, setWinStreak] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/battle`);
      const data = await response.json();
      setCharacterOne(data.characterOne);
      setCharacterTwo(data.characterTwo);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleVote = async (winnerId: string, loserId: string) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/battle/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          winnerId,
          loserId,
          currentStreak: winStreak,
        }),
      });
      const data = await response.json();

      if (data.newStreak) {
        setWinStreak(data.newStreak);
        fetchCharacters();
      } else if (data.characterId) {
        navigate(`/character/${data.characterId}`);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
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
        <div
          onClick={() => handleVote(characterOne.id, characterTwo.id)}
          className="cursor-pointer"
        >
          <img
            src={characterOne.image_url}
            alt={characterOne.name}
            className="w-64 h-64 object-cover rounded"
          />
          <p className="text-center mt-2">{characterOne.name}</p>
        </div>
        <div
          onClick={() => handleVote(characterTwo.id, characterOne.id)}
          className="cursor-pointer"
        >
          <img
            src={characterTwo.image_url}
            alt={characterTwo.name}
            className="w-64 h-64 object-cover rounded"
          />
          <p className="text-center mt-2">{characterTwo.name}</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>Current Win Streak: {winStreak}</p>
      </div>
    </div>
  );
}

export default BattlePage;
