import { useEffect, useState } from 'react';

import { api } from '@/services';

import { ClassType } from '@/utils/types';

export function useClasses() {
  const [data, setData] = useState<ClassType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data, error } = await api.class.list();
        if (error) throw new Error(error.message);
        setData(data! as unknown as ClassType[]);
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
