import { api } from '@/services';
import { Student } from '@/utils/types';
import { useEffect, useState } from 'react';

export function useStudents() {
  const [data, setData] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data: student, error } = await api.student.list();
        if (error) throw error;
        setData(student! as unknown as Student[]);
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
