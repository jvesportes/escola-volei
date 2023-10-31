import { api } from '@/services';
import { Teacher } from '@/utils/types';
import { useEffect, useState } from 'react';

export function useProfessor() {
  const [data, setData] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { mappedData, error } = await api.teacher.list();
        if (error) throw new Error(error.message);
        setData(mappedData! as unknown as Teacher[]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        setError(error);
      }
    })();
  }, [setData, setError, setIsLoading]);

  return {
    data,
    error,
    isLoading,
  };
}
