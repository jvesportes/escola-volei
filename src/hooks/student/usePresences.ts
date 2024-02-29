import { useEffect, useState } from 'react';

import { api } from '@/services';

import { Presence } from '@/utils/types';

export function usePresences(classId: string, studentId: string) {
  const [data, setData] = useState<Presence[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data, error } = await api.class.listPresences(classId, studentId);
        if (error) throw error;
        setData(data as unknown as Presence[]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        setError(error);
      }
    })();
  }, [setData, setError, setIsLoading, classId, studentId]);

  return {
    data,
    error,
    isLoading,
  };
}
