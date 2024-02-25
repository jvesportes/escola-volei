import { useEffect, useState } from 'react';

import { useAlunosStore } from '@/app/store/useAlunosStore';
import { api } from '@/services';
import { Student } from '@/utils/types';

export function useStudents() {
  const [data, setData] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const { setStudents } = useAlunosStore.getState();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data: student, error } = await api.student.list();
        setStudents(student);
        if (error) throw new Error(error.message);
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
