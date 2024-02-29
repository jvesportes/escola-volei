import { useEffect, useState } from 'react';

import { api } from '@/services';

import { ClassType } from '@/utils/types';

export function useClass(id: string) {
  const [data, setData] = useState<ClassType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { turma, error } = await api.class.get(id);
        if (error) throw new Error(error.message);
        setData(turma! as unknown as ClassType);
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
