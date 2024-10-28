import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { Character } from '../types/Character';

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = () => {
      fetch(`${config.apiBaseUrl}/characters`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch characters');
          }
          return response.json();
        })
        .then((data) => {
          setCharacters(data);
        })
        .catch((error) => {
          console.error('Error fetching characters:', error);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchCharacters();
  }, []);

  const handleCharacterClick = (id: string) => {
    navigate(`/character/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">All Characters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Card
            key={character.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCharacterClick(character.id)}
          >
            <CardHeader>
              <CardTitle className="text-center">{character.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <AspectRatio ratio={3 / 4}>
                <img
                  src={character.image_url}
                  alt={character.name}
                  className="w-full h-full object-cover rounded"
                />
              </AspectRatio>
            </CardContent>
            <CardFooter>
              <div className="text-center">
                <p>Total Wins: {character.total_wins}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CharactersPage;
