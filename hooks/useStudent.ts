import { Database } from '@/lib/database.types';
import { api } from '@/services';
import { useEffect, useState } from 'react';

export function useStudent(id: string) {
  const [data, setData] = useState<
    Database['public']['Tables']['alunos']['Row'] & {
      responsavel?: Database['public']['Tables']['responsaveis']['Row'];
    }
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data: student, error } = await api.student.get(id);
        if (error) throw error;
        setData(student);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        setError(error);
      }
    })();
  }, [setData, setError, setIsLoading, id]);

  return {
    data,
    error,
    isLoading,
  };
}
