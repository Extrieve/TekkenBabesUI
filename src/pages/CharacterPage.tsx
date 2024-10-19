import { Character } from '@/types/Character';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config';

function CharacterPage() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/characters/${id}`);
        const data = await response.json();
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
      <img
        src={character.image_url}
        alt={character.name}
        className="w-64 h-64 object-cover rounded mx-auto"
      />
      <p className="mt-4">{character.bio}</p>
      <p className="mt-4 font-semibold">Total Wins: {character.total_wins}</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate('/battle')}
      >
        Battle Again
      </button>
    </div>
  );
}

export default CharacterPage;
