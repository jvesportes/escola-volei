import { Database } from '@/lib/database.types';
import { api } from '@/services';
import { useEffect, useState } from 'react';

export function useStudents() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data: student, error } = await api.student.list();
        if (error) throw error;
        setData(student!);
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
