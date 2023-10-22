import { Professor, professores } from '@/utils/types';
import { useState, useEffect } from 'react';

export const useProfessor = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        setIsLoading(true);

        // const response = await fetch('https://example.com/api/professors');
        // const data = await response.json();

        setProfessors(professores);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  return {
    professores: professors,
    isLoading: isLoading,
  };
};
